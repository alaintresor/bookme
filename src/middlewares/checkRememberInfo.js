import db from '../database/models/index';
const users = db['users'];

export const checkRememberInfo = async (req, res, next) => {
  const userId = req.user.id;
  const requester = await users.findOne({ where: { id: userId } });
  if (requester.remember_info === true && req.cookies) {
    if (!req.body.passportName || req.body.passportName === '') {
      req.body.passportName = req.cookies.passportName;
    }
    if (!req.body.passportNumber || req.body.passportNumber === '') {
      req.body.passportNumber = req.cookies.passportNumber;
    }
  }
  next();
};
