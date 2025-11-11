import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import izinRoutes from "./src/routes/izinRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/izin", izinRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server berjalan dengan baik ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
