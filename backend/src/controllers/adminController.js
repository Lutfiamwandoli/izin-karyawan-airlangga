import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// CRUD KARYAWAN
export const getAllKaryawan = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: { jabatan: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data users", error });
  }
};

export const addKaryawan = async (req, res) => {
  try {
    const {
      nik,
      nama,
      jabatan_id,
      divisi,
      status,
      telp,
      tmm_tmt,
      role,
      password,
      atasan_id,
    } = req.body;

    const newUser = await prisma.users.create({
      data: {
        nik,
        nama,
        jabatan_id,
        divisi,
        status,
        telp,
        tmm_tmt: tmm_tmt ? new Date(tmm_tmt) : null,
        role,
        password,
        atasan_id: Number(atasan_id)
      },
    });

    res.json(newUser);
  } catch (error) {
  console.error("ERROR CREATE KARYAWAN:", error);
  res.status(500).json({ message: "Gagal menambahkan karyawan", error: error.message });
}

  console.log("DATA MASUK:", req.body);

};
export const getKaryawanById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
      include: {
        jabatan: true,
        atasan: true,
      }
    });

    if (!user) return res.status(404).json({ message: "Karyawan tidak ditemukan" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data karyawan", error });
  }
};

export const updateKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nik,
      nama,
      jabatan_id,
      divisi,
      status,
      telp,
      tmm_tmt,
      role,
      password,
      atasan_id,
    } = req.body;

    const data = {
      nik,
      nama,
      jabatan_id,
      divisi,
      status,
      telp,
      tmm_tmt: tmm_tmt ? new Date(tmm_tmt) : null,
      role,
      atasan_id,
    };

    if (password) data.password = password;

    const updated = await prisma.users.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah data users", error });
  }
};

export const deleteKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.users.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Karyawan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus users", error });
  }
};



// CRUD JABATAN
export const getAllJabatan = async (req, res) => {
  try {
    const jabatan = await prisma.jabatan.findMany({
      include: { atasan: true },
    });
    res.json(jabatan);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data jabatan", error });
  }
};

export const addJabatan = async (req, res) => {
  try {
    const { nama, atasan_id } = req.body;
    const newJabatan = await prisma.jabatan.create({
      data: { nama, atasan_id },
    });
    res.json(newJabatan);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan jabatan", error });
  }
};

export const updateJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, atasan_id } = req.body;

    const updated = await prisma.jabatan.update({
      where: { id: parseInt(id) },
      data: { nama, atasan_id },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah jabatan", error });
  }
};

export const deleteJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.jabatan.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Jabatan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus jabatan", error });
  }
};



// CRUD ATASAN
export const getAllAtasan = async (req, res) => {
  try {
    const atasan = await prisma.atasan.findMany({
      include: { bawahan: true },
    });
    console.log(atasan);
    
    res.json(atasan);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addAtasan = async (req, res) => {
  try {
    const { nama } = req.body;
    const newAtasan = await prisma.atasan.create({ data: { nama } });
    res.json(newAtasan);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan atasan", error });
  }
};

export const updateAtasan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;

    const updated = await prisma.atasan.update({
      where: { id: parseInt(id) },
      data: { nama },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah atasan", error });
  }
};

export const deleteAtasan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.atasan.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Atasan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus atasan", error });
  }
};



// RELASI BAWAHAN–ATASAN
export const getBawahanByAtasan = async (req, res) => {
  try {
    const { id } = req.params;
    const bawahan = await prisma.jabatan.findMany({
      where: { atasan_id: parseInt(id) },
      include: { users: true },
    });
    res.json(bawahan);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data bawahan", error });
  }
};
