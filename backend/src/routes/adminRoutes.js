import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addAtasan, addJabatan, addKaryawan, deleteAtasan, deleteJabatan, deleteKaryawan, getAllAtasan, getAllJabatan, getAllKaryawan, getKaryawanById, updateAtasan, updateJabatan, updateKaryawan } from "../controllers/adminController.js";

const router = express.Router();

router.use(verifyToken, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak! Hanya admin." });
  }
  next();
});

router.get("/karyawan", getAllKaryawan);
router.post("/karyawan", addKaryawan);
router.get("/karyawan/:id", getKaryawanById);
router.put("/karyawan/:id", updateKaryawan);
router.delete("/karyawan/:id", deleteKaryawan);
router.get("/jabatan", getAllJabatan);
router.post("/jabatan", addJabatan);
router.put("/jabatan/:id", updateJabatan);
router.delete("/jabatan/:id", deleteJabatan);
router.get("/atasan", getAllAtasan);
router.post("/atasan", addAtasan);
router.put("/atasan/:id", updateAtasan);
router.delete("/atasan/:id", deleteAtasan);

export default router;
