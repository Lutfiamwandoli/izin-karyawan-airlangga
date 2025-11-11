import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const { nik, password } = req.body;

    if (!nik || !password) {
      return res.status(400).json({ message: "NIK dan password wajib diisi!" });
    }

    const user = await prisma.users.findUnique({ where: { nik } });

    if (!user) {
      return res.status(404).json({ message: "NIK tidak ditemukan!" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, jabatan: user.jabatan },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    let roleDesc = "karyawan";
    if (user.role === "admin") roleDesc = "admin";
    else if (user.role === "hrd") roleDesc = "HRD";
    else if (user.role === "kepala_sekolah") roleDesc = "kepala sekolah";

    res.json({
      message: `Login berhasil (${roleDesc})`,
      token,
      user: { 
        id: user.id,
        nik: user.nik,
        nama: user.nama,
        role: user.role,
        jabatan: user.jabatan,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
