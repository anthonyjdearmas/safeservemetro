const { validationResult } = require('express-validator');

const { authMiddleware } = require('../middleware/auth');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.checkIfAuthIsValid = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(200).json({ isValid: false });
    return;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretfortoken');
  } catch (err) {
    res.status(200).json({ isValid: false });
    return;
  }
  if (!decodedToken) {
    res.status(200).json({ isValid: false });
    return;
  }

  res.status(200).json({ isValid: true });
};


exports.getAccessCode = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretfortoken');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }

  req.userAccessCode = decodedToken.accessCode;
  res.status(200).json({ userAccessCode: req.userAccessCode });
};


exports.login = async (req, res, next) => {
  try {
    const accessCode = req.body.userAccessCode;
    const user = await User.find(accessCode);
    if (user[0].length !== 1) {
      const error = new Error('Invalid access code.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];
    const isEqual = accessCode == storedUser.accessCode;

    if (!isEqual) {
      const error = new Error('Invalid access code.');
      error.statusCode = 401;
      throw error;
    }

    const expirationDate = await User.getExpirationDate(accessCode);
    if (expirationDate[0][0].expirationDate < new Date()) {
      const error = new Error('Access code expired.');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        accessCode: storedUser.accessCode
      },
      'secretfortoken',
      { expiresIn: '4h' }
    );

    res.status(200).json({ token: token, userAccessCode: storedUser.accessCode });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
