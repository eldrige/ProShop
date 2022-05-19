// @callBack, takes two params, paramA = err, paramB = Where files will be uploaded
// extname is a path fn that returns the extension of a file
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// initializing storage engine
const storage = multer.diskStorage({
  // extname() gets the extension of the file
  destination(req, file, callBack) {
    callBack(null, 'uploads/');
  },
  filename(req, file, callBack) {
    console.log(file, 'From storage handler');
    callBack(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, callBack) => {
  const supportedFileTypes = /jpg|jpeg|png/;

  const extname = supportedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = supportedFileTypes.test(file.mimetype);

  if (extname && mimetype) return callBack(null, true);
  callBack('Images only!');
};

const upload = multer({
  storage,
  fileFilter: function (req, file, callBack) {
    checkFileType(file, callBack);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send(`/${req.file.path}`);
});

export default router;
