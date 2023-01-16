import db from '../database/models/index.js';
const users = db['users'];
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
  try {
    users.findAndCountAll().then((users) => {
      return res.status(200).json({
        status: true,
        data: users,
        message: 'Retrieved',
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const createUser = async (req, res) => {
  try {
    if (!req.body.username && !req.body.password && !req.body.fullname) {
      throw new Error('Body is required');
    }
    if (!req.body.password || req.body.password.trim() === '') {
      return fail(res, 400, req.body, 'Please make sure you add password');
    }
    const newUser = users.create(req.body);
    const { fullname, username, email, role, password } = req.body;
    return res.status(201).json({
      status: true,
      data: { fullname, username, email, role, password },
      message: 'New user have been created',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUser = (user, userInfo) =>
  users.update(userInfo, {
    where: user,
    returning: true,
  });

export const updateRole = (req, res, next) => {
  const email = req.body.email;
  const role = req.body.role;

  users
    .findOne({ where: { email: email } })
    .then((user) => {
      console.log(user);
      if (user === null) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role === 'super admin') {
        return res
          .status(403)
          .json({ message: 'Super admin can not be updated' });
      }
      updateUser({ email: email }, { role: role });

      return res.status(200).json({ result: 'user role updated' });
    })
    .catch((error) => res.status(404).json({ error }));
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Please make sure you add email and password');
    }
    const user = await users.findOne({
      where: {
        email,
        password,
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return res.status(200).json({
      status: true,
      token: generateToken(user.id),
      data: user,
      message: 'Login Successful',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
