import express from "express";
import {
  ajukanIzin,
  getIzinSaya,
  getIzinBawahan,
  verifikasiIzin,
} from "../controllers/izinController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();


router.post(
  "/ajukan",
  verifyToken,
  allowRoles("karyawan", "hrd", "atasan", "kepala_sekolah"),
  upload.single("bukti"),
  ajukanIzin
);

router.get(
  "/saya",
  verifyToken,
  allowRoles("karyawan", "hrd", "atasan", "kepala_sekolah"),
  getIzinSaya
);

router.get(
  "/bawahan",
  verifyToken,
  allowRoles("hrd", "atasan", "kepala_sekolah"),
  getIzinBawahan
);

router.post(
  "/verifikasi/:id",
  verifyToken,
  allowRoles("hrd", "atasan", "kepala_sekolah"),
  verifikasiIzin
);

export default router;
