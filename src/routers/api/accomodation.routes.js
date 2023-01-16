import express from 'express';
import multer from 'multer';
import isAdmin from '../../middlewares/isAdmin';
import isValidRole from '../../middlewares/isValidRole';
import {
  createAccomodation,
  getAllAccomodation,
  deleteAccomodation,
  updateAccomodation,
  getSingleAccomodation,
  updateLike,
  getLikes,
} from '../../controllers/accomodation.controller.js';
import { protect } from '../../controllers/authentication';
const router = express.Router();
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });
router.get('/', getAllAccomodation);
router.post('/', protect, uploads.single('image'), createAccomodation);
router.put('/:id', protect, uploads.single('image'), updateAccomodation);
router.delete('/:id', protect, deleteAccomodation);
router.get('/:id', getSingleAccomodation);

router.put('/like/:id', protect, updateLike);
router.get('/like/:id', getLikes);

export default router;
