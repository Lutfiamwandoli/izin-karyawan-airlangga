import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//ambil semua karyawan
export const getAllKaryawan = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data users" });
  }
};

//tambah karyawan
export const addKaryawan = async (req, res) => {
  try {
    const { nik, nama, jabatan_id, divisi, status, telp, tmm_tmt, role, password } = req.body;


    const newUsers = await prisma.users.create({
      data: { nik, nama, jabatan_id, divisi, status, telp, tmm_tmt, role, password },
    });

    res.json(newUsers);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan users" });
  }
};


//update karyawan
export const updateKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nik, nama, jabatan_id, divisi, status, telp, tmm_tmt, role, password } = req.body;

    const data = { nik, nama, jabatan_id, divisi, status, telp, tmm_tmt, role, password };
    if (password) data.password = password;

    const updated = await prisma.users.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah data" });
  }
};

//delete karyawan
export const deleteKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.users.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Karyawan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus users" });
  }
};
