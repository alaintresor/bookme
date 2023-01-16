import catchAsync from '../utils/catchAsync';
import db from '../database/models/index.js';

const { Notifications } = db;

export const getAllNotifications = catchAsync(async (req, res, next) => {
  const allNotifications = await Notifications.findAndCountAll({
    where: {
      userId: req.user.id,
    },
  });

  res.status(200).json({ status: 'success', data: allNotifications });
});

export const readNotification = catchAsync(async (req, res, next) => {
  await Notifications.update(
    {
      read: true,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );

  res.status(200).json({ status: 'success', data: 'notification is read' });
});

export const readAllNotification = catchAsync(async (req, res, next) => {
  await Notifications.update(
    {
      read: true,
    },
    {
      where: {
        userId: req.user.id,
      },
    },
  );

  res
    .status(200)
    .json({ status: 'success', message: 'all notifications are read' });
});
