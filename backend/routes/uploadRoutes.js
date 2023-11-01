import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const subjectStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/subject/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const lessonStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/lesson/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const subjectUpload = multer({ storage: subjectStorage, fileFilter });
const lessonUpload = multer({ storage: lessonStorage, fileFilter });

router.post('/subject', (req, res) => {
  subjectUpload.single('image')(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/uploads/subject/${req.file.filename}`,
    });
  });
});

router.post('/lesson', (req, res) => {
  lessonUpload.single('image')(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/uploads/lesson/${req.file.filename}`,
    });
  });
});



//  to handle multiple images
// router.post('/', upload.array('images', 5), (req, res) => {
//     res.send({
//         message: 'Images uploaded',
//         images: req.files.map(file => `/${file.path}`),
//     });
// });

export default router;