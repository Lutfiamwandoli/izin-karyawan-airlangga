import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addKaryawan, deleteKaryawan, getAllKaryawan, updateKaryawan } from "../controllers/adminController.js";

const router = express.Router();

router.use(verifyToken, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak! Hanya admin." });
  }
  next();
});

router.get("/karyawan", getAllKaryawan);
router.post("/karyawan", addKaryawan);
router.put("/karyawan/:id", updateKaryawan);
router.delete("/karyawan/:id", deleteKaryawan);

export default router;
