import express from "express";
import {
  ajukanIzin,
  getIzinSaya,
  getIzinBawahan,
  verifikasiIzin,
  getJenisIzin,
  getIzin,
  cetakIzinPDF,
  ubahpw,
  profil,
  getProfil,
  getUserByToken,
  getNotifikasi,
  readNotifikasi,
} from "../controllers/izinController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js";
import { uploadFoto } from "../middleware/uploadFoto.js";

const router = express.Router();


router.post(
  "/ajukan",
  verifyToken,
  allowRoles("karyawan", "hrd", "atasan"),
  upload.single("bukti"),
  ajukanIzin
);

router.get(
  "/user",
  verifyToken,
  allowRoles("karyawan", "hrd", "atasan"),
  getIzin
);

router.get(
  "/userbytoken",
  verifyToken,
  getUserByToken
)

router.get(
  "/saya",      
  verifyToken,
  allowRoles("karyawan", "hrd", "atasan"),
  getIzinSaya
);

router.get(
  "/bawahan",
  verifyToken,
  allowRoles("hrd", "atasan"),
  getIzinBawahan
);

router.put(
  "/verifikasi/:id",
  verifyToken,
  allowRoles("hrd", "atasan"),
  verifikasiIzin
);
router.get(
  "/notifikasi", verifyToken, getNotifikasi 
)

router.patch( "/read/:id", verifyToken, readNotifikasi)

router.get("/jenis-izin", verifyToken,
  allowRoles("karyawan","hrd", "atasan"), getJenisIzin);

  router.get(
  "/cetak/:id",
  cetakIzinPDF
);

router.post("/password", verifyToken, ubahpw)

router.get("/profil", verifyToken, getProfil)
router.put("/profil", uploadFoto.single("foto"), verifyToken, profil)

export default router;
