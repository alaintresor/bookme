import db from '../database/models/index.js';
import jwt from 'jsonwebtoken';
const users = db['users'];

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  const user = await users.findByPk(userId);

  if (user.role !== 'super admin') {
    return res.status(403).json({ message: 'Not Authorized' });
  }

  next();
};
