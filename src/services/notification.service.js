import catchAsync from '../utils/catchAsync';
import db from '../database/models/index.js';

const { Notifications } = db;

const createNotification = catchAsync(
  async (userId, title, description, url) => {
    await Notifications.create({
      title,
      description,
      url,
      userId,
      read: false,
    });
  },
);

export default createNotification;
