import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import db from '../database/models/index.js';
import { fileUpload } from '../helpers/multer';
import { updateProfileSchema } from '../helpers/validation_schema';
const User = db['users'];

export const getAllUsers = catchAsync(async (req, res, next) => {
  try {
    let users = await User.findAll({
      attributes: {
        exclude: [
          'password',
          'createdAt',
          'updatedAt',
          'passwordChangedAt',
          'passwordResetExpires',
          'passwordResetToken',
          ' socialMediaId',
        ],
      },
    });
    return res.status(200).json({
      status: true,
      data: users,
      message: 'Retrieved',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export const getUserData = catchAsync(async (req, res, next) => {
  try {
    let user = await User.findOne({
      attributes: {
        exclude: [
          'password',
          'createdAt',
          'updatedAt',
          'passwordChangedAt',
          'passwordResetExpires',
          'passwordResetToken',
          ' socialMediaId',
        ],
      },
      where: { id: req.params.id },
    });
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    return res.status(200).json({
      status: true,
      data: user,
      message: 'Retrieved',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export const updateUserProfile = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.dataValues.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    if (req.file) {
      req.body.image = await fileUpload(req);
    } else {
      req.body.image =
        'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80';
    }
    await updateProfileSchema.validateAsync(req.body);
    const {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      image,
      gender,
      preferredLanguage,
      preferredCurrency,
      department,
      lineManager,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !phoneNumber ||
      !image ||
      !gender ||
      !preferredLanguage ||
      !preferredCurrency ||
      !department ||
      !lineManager
    ) {
      return next(new AppError('Please fill empty fields!', 400));
    }
    const updatedUser = await User.update(
      {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        image,
        gender,
        preferredLanguage,
        preferredCurrency,
        department,
        lineManager,
      },
      {
        where: { id: user.id },
      },
    );
    if (updatedUser)
      res.status(200).json({
        status: true,
        data: updatedUser,
        message: 'user Profile updated well done',
      });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});
