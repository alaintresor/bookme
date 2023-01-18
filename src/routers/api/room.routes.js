import express from 'express';
import multer from 'multer';
import {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '../../controllers/room.controller';

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

router.get('/', getAllRooms);
router.post('/:accomodationId',protect,uploads.single('image'), createRoom);
router.post('/', getSingleRoom);
router.put('/:id', protect, updateRoom);
router.delete('/:id', protect, deleteRoom);
export default router;
