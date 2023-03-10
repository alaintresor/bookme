import express from 'express';
import {
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  signup,
} from '../../controllers/authentication';


import isValidRole from '../../middlewares/isValidRole';
import isAdmin from '../../middlewares/isAdmin';
import multer from 'multer';
import {
  getAllNotifications,
  readAllNotification,
  readNotification,
} from '../../controllers/notificationController';

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/logout', logout);
userRouter.post('/login', login);


userRouter.post('/signup', signup);
userRouter.get('/notification/get', protect, getAllNotifications);
userRouter.patch('/notification/:id', protect, readNotification);
userRouter.put('/notification/read', protect, readAllNotification);
userRouter.post('/logout', logout);
userRouter.post('/login', login);

userRouter.post('/forgotpassword', forgotPassword);
userRouter.patch('/resetpassword/:token', resetPassword);

export default userRouter;
