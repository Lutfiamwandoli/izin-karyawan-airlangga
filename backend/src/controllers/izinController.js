import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

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
      include: { jabatan: true },
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
        jenis_izin_id: parseInt(jenis_izin_id),
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
        await prisma.verifikasi_izin.create({
          data: {
            izin_id: izin.id,
            verifikator_id: atasanUser.id,
            status_verifikasi: "menunggu",
            tanggal_verifikasi: new Date(),
          },
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
      include: { jenis_izin: true, verifikasi: true },
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

    if (!["hrd", "admin", "kepala_sekolah"].includes(role)) {
      const izinBawahan = await prisma.izin.findMany({
        where: {
          user: {
            jabatan: { atasan_id: jabatan_id },
          },
        },
        include: { user: true, jenis_izin: true },
      });

      return res.json(izinBawahan);
    }

    const izin = await prisma.izin.findMany({
      where: { status_izin: "diajukan" },
      include: { user: true, jenis_izin: true },
      orderBy: { id: "desc" },
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
        status_izin,
        tanggal_verifikasi: new Date(),
      },
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
