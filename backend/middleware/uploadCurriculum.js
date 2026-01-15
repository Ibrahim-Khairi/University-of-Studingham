import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/curriculum");
  },
  filename: (req, file, cb) => {
    cb(null, `curriculum-${Date.now()}-${file.originalname}`);
  },
});

const uploadCurriculum = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploadCurriculum;
