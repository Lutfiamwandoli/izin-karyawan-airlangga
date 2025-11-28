import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { PDFImage } from "pdf-image";
import multer from "multer";
import { error, log } from "console";





const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export const getIzin = async (req, res) => {
  try {
    const izin = await prisma.izin.findMany({
      include: {
        jenis_izin: true,
        user: {
          include: {
            jabatan: true,   
            atasan: true,    
          },
        },
        verifikasi: true
      }
    });

    res.json(izin);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data izin", error });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      include: {
        jabatan: true,
        atasan: {
          select: {
            id: true,
            nama: true,
            role: true,
          }
        }
      }
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const ajukanIzin = async (req, res) => {
  try {
    const {
      keperluan,
      tanggal_mulai,
      tanggal_selesai,
      tanggal_masuk_kembali,
      jenis_izin_id,
    } = req.body;

    const bukti = req.file ? req.file.filename : null;

    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      include: { jabatan: true, atasan: true,
       },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    let jumlah_hari = null;
    if (tanggal_mulai && tanggal_selesai) {
      const startDate = new Date(tanggal_mulai);
      const endDate = new Date(tanggal_selesai);
      jumlah_hari =
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    }

    const izin = await prisma.izin.create({
      data: {
        user_id: user.id,
        jenis_izin_id: Number(jenis_izin_id),
        tanggal_pengajuan: new Date(),
        tanggal_mulai: tanggal_mulai ? new Date(tanggal_mulai) : null,
        tanggal_selesai: tanggal_selesai ? new Date(tanggal_selesai) : null,
        tanggal_masuk_kembali: tanggal_masuk_kembali
          ? new Date(tanggal_masuk_kembali)
          : null,
        jumlah_hari,
        keperluan: keperluan || "",
        bukti,
        status_izin: "diajukan",
      },
    });

    const atasanLangsung = await prisma.jabatan.findUnique({
      where: { id: user.jabatan_id },
      select: { atasan_id: true },
    });

    if (atasanLangsung?.atasan_id) {
      const atasanUser = await prisma.users.findFirst({
        where: { jabatan_id: atasanLangsung.atasan_id },
      });

      if (atasanUser) {
        await prisma.verifikasiIzin.create({
          data: {
            izin_id: izin.id,
            verifikator_id: atasanUser.id,
            status_verifikasi: "menunggu",
            tanggal_verifikasi: new Date(),
          },
        });
      }
      if (user.atasan) {
  await prisma.notifikasi.create({
    data: {
      user_id: user.atasan_id,
      message: `${user.nama} mengajukan izin baru`,
      tipe: "izin_baru"
    }
  });
}
    }

    res.status(201).json({
      message: "Izin berhasil diajukan",
      data: {
        ...izin,
        nama: user.nama,
        jabatan: user.jabatan.nama,
        bukti_url: bukti ? `${BASE_URL}/uploads/bukti/${bukti}` : null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengajukan izin" });
  }
};

export const getIzinSaya = async (req, res) => {
  try {
    const izin = await prisma.izin.findMany({
      where: { user_id: req.user.id },
      include: { 
        jenis_izin: true, 
        user: {
          include: {
            jabatan: {
              include:{
                atasan: true,
              },
            },   
                
          },
        },
        verifikasi: true },
      
      orderBy: { id: "desc" },
    });

    const izinWithURL = izin.map((i) => ({
      ...i,
      bukti_url: i.bukti ? `${BASE_URL}/uploads/bukti/${i.bukti}` : null,
    }));

    res.json(izinWithURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memuat izin" });
  }
};

export const getIzinBawahan = async (req, res) => {
  try {
    const { role, jabatan_id } = req.user;

    // Jika user adalah ATASAN → ambil data bawahan
    if (role === "atasan") {
      const izinBawahan = await prisma.izin.findMany({
        where: {
          user: {
             id: { not: req.user.id },
            jabatan: { atasan_id: jabatan_id },
          },
        },
        include: { user: true, jenis_izin: true },
        orderBy: { id: "desc" }
      });

      return res.json(izinBawahan);
    }

    // Jika user adalah HRD, Admin, Kepala Sekolah → ambil semua izin diajukan
    const izin = await prisma.izin.findMany({
      where: { status_izin: "diajukan" },
      include: { user: true, jenis_izin: true },
      orderBy: { id: "desc" }
    });

    res.json(izin);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memuat izin bawahan" });
  }
};

export const verifikasiIzin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_izin } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID izin wajib disertakan!" });
    }

    if (!["disetujui", "ditolak"].includes(status_izin)) {
      return res.status(400).json({ message: "Status izin tidak valid!" });
    }

    if (!["hrd", "admin", "kepala_sekolah", "atasan"].includes(req.user.role)) {
      return res.status(403).json({ message: "Akses ditolak!" });
    }

    const izin = await prisma.izin.findUnique({ where: { id: parseInt(id) } });
    if (!izin) {
      return res.status(404).json({ message: "Data izin tidak ditemukan!" });
    }

    const updated = await prisma.izin.update({
      where: { id: parseInt(id) },
      data: {
        status_izin
      },
    });

    await prisma.notifikasi.create({
      data: {
        user_id: izin.user_id,
        message: `Izin Anda telah ${status_izin}`,
        tipe: "izin_status"
      }
    });
    res.json({
      message: `Izin ID ${id} berhasil diverifikasi (${status_izin})`,
      data: updated,
    });
  } catch (error) {
    console.error("Error verifikasi izin:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
export const getJenisIzin = async (req, res) => {
  const data = await prisma.jenisIzin.findMany();
  res.json(data);
};

export const getNotifikasi = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifikasi = await prisma.notifikasi.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" }
    });

    res.json(notifikasi);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Gagal mengambil notifikasi" });
  }
};

// Tandai notifikasi sebagai dibaca
export const readNotifikasi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.notifikasi.update({
      where: { id },
      data: { status: "read" }
    });

    res.json({ message: "Notifikasi dibaca" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Gagal update notifikasi" });
  }
};

export const cetakIzinPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const izin = await prisma.izin.findUnique({
      where: { id: Number(id) },
      include: {
        jenis_izin: true,
        user: {
          include: {
            jabatan: { include: { atasan: true } }
          }
        },
        verifikasi: true
      },
    });

    if (!izin) return res.status(404).json({ message: "Izin tidak ditemukan" });

    const checkbox = (val) => izin.jenis_izin.nama_izin === val ? "✔" : "□";

    const buktiPath = izin.bukti ? path.join(process.cwd(), "uploads", "bukti", izin.bukti) : null;
    let buktiBase64 = null;

    if (buktiPath && fs.existsSync(buktiPath)) {
      const ext = path.extname(buktiPath).toLowerCase();

      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
        buktiBase64 = `data:image/${ext.replace(".", "")};base64,${fs.readFileSync(buktiPath, "base64")}`;
      } else if (ext === ".pdf") {
        const pdfImage = new PDFImage(buktiPath);
        const imagePath = await pdfImage.convertPage(0);
        buktiBase64 = `data:image/png;base64,${fs.readFileSync(imagePath, "base64")}`;
      }
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    // Logo sekolah
    const logoPath = path.join(process.cwd(), "src", "public", "image.png");
    const logoBase64 = fs.readFileSync(logoPath, "base64");

    await page.setContent(`
      <html>
<head>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      margin: 20px;
      line-height: 1.4;
    }

    .kop-container {
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }

    .kop-title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.3;
    }

    table { 
      width: 100%; 
      border-collapse: collapse; 
    }

    .box { 
      border: 1px solid #000; 
      padding: 8px; 
      margin-top: 10px; 
      font-size: 12px;
    }

    .ttd-box { 
      border: 1px solid #000; 
      height: 80px; 
      text-align: center; 
      vertical-align: bottom;
      padding-bottom: 10px;
      font-size: 12px;
    }

    th, td {
      padding: 5px;
      vertical-align: top;
    }

    h3 { 
      text-align: center; 
      margin-top: 20px; 
      font-size: 14px; 
    }
  </style>
</head>

<body>

<!-- ===========================
     KOP SURAT
     =========================== -->

<div class="kop-container">
  <table>
    <tr>
      <td width="20%">
        <img src="data:image/png;base64,${logoBase64}" width="90" />
      </td>
      <td width="60%" class="kop-title">
        FORMULIR<br>
        IJIN KETIDAKHADIRAN<br>
        KARYAWAN YAYASAN AIRLANGGA
      </td>
      <td width="20%" style="font-size:11px;">
        <div>No. Dok : -</div>
        <div>Tgl : ${new Date().toLocaleDateString("id-ID")}</div>
        <div>Revisi : -</div>
        <div>Hal : 1/2</div>
      </td>
    </tr>
  </table>
</div>

<!-- ===========================
     DATA KARYAWAN
     =========================== -->

<h3>DATA KARYAWAN</h3>

<table style="font-size:12px;">
  <tr>
    <td style="width:20%; font-weight:bold;">Nama</td>
    <td style="width:35%;">: ${izin.user.nama}</td>
    <td style="width:15%; font-weight:bold;">TMM/TMT</td>
    <td style="width:30%;">: ${izin.user.tmm_tmt?.toISOString().slice(0,10)}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">NIK</td>
    <td>: ${izin.user.nik}</td>
    <td style="font-weight:bold;">Jabatan</td>
    <td>: ${izin.user.jabatan?.nama}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Telp/HP</td>
    <td>: ${izin.user.telp}</td>
    <td></td>
    <td></td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Divisi</td>
    <td colspan="3">: SMK TI Airlangga Samarinda</td>
  </tr>
</table>

<!-- ===========================
     JENIS IJIN
     =========================== -->

<div class="box" style="font-size:13px;">
  <b style="align-text:center;">IJIN YANG DIMINTA</b><br><br>

  <table style="width:100%; text-align:center;">
    <tr>
      <td style="width:33.33%; text-align:left;">
        ${checkbox("Sakit")} Ijin Sakit
      </td>
      <td style="width:33.33%;">
        ${checkbox("Ijin Studi Lanjut")} Ijin Studi Lanjut
      </td>
      <td style="width:33.33%; text-align:right;">
        ${checkbox("Keperluan Pribadi")} Ijin Keperluan Pribadi
      </td>
    </tr>
  </table>

  <br>

  1. Jumlah Hari Ijin : <b>${izin.jumlah_hari}</b> Hari  
  ( ${izin.tanggal_mulai.toISOString().slice(0,10)} s/d ${izin.tanggal_selesai.toISOString().slice(0,10)} ) <br>

  2. Masuk Kembali : ${izin.tanggal_masuk_kembali?.toISOString().slice(0,10)} <br>
  3. Keperluan : ${izin.keperluan} <br>
  4. Bukti : Terlampir di halaman berikutnya
</div>


<!-- ===========================
     PERSETUJUAN DIVISI
     =========================== -->

<h3>PERSETUJUAN DIVISI</h3>

<table border="1" style="font-size:12px;">
  <tr style="font-weight:bold; text-align:center;">
    <th>Kepala Divisi</th>
    <th>HRD Divisi</th>
    <th>Atasan Langsung</th>
  </tr>

  <tr>
    <td class="ttd-box">Muhammad Yani, S.Kom., M.T.I.</td>
    <td class="ttd-box">Fardiyansyah Ibrahim, S.Kom</td>
    <td class="ttd-box">${izin.user.jabatan?.atasan?.nama ?? "-"}</td>
  </tr>

  <tr style="text-align:center; font-size:11px;">
    <td>${new Date().toLocaleDateString("id-ID")}</td>
    <td>${new Date().toLocaleDateString("id-ID")}</td>
    <td>${new Date().toLocaleDateString("id-ID")}</td>
  </tr>
</table>

<!-- ===========================
     HALAMAN 2
     =========================== -->

<div style="page-break-before: always;"></div>

<h2 style="text-align:center;">Lampiran Bukti</h2>

</body>
</html>


      ${
        buktiBase64
          ? `<img src="${buktiBase64}" style="width:100%; max-height:1000px; object-fit:contain;" />`
          : "<p style='text-align:center;'>Tidak ada bukti yang diupload.</p>"
      }

      </body>
      </html>
    `);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px" }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=izin.pdf",
    });

    return res.send(pdfBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat PDF", error });
  }
};

export const ubahpw = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // Tanpa hash sesuai permintaan
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Password saat ini salah" });
    }

    await prisma.users.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    res.json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah password" });
  }
};


export const getProfil = async (req, res) => {
  try {
    const userId = req.user.id; // dari middleware JWT

    const profil = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        jabatan: {
          include: {
            atasan: true
          }
        }
      }
    });

    if (!profil) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(profil);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const profil = async (req, res) => {
  const userId = req.user.id;

  try {
    const data = {
      nik: req.body.nik,
      nama: req.body.nama,
      
    };

    if (req.file) data.foto = req.file.filename;

    const update = await prisma.users.update({
      where: { id: userId },
      data
    });

    res.json(update);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal update profil" });
  }
};
