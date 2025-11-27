import multer from "multer";
import fs from "fs";
import path from "path";

const dir = "./uploads/foto";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storageFoto = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-foto" + ext);
  },
});

const filterFoto = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Format foto harus JPG atau PNG!"), false);
};

export const uploadFoto = multer({ storage: storageFoto, fileFilter: filterFoto });
