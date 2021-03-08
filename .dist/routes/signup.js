"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * create new user
 */
exports.signup = async (req, res, next) => {
  const pass = req.body.password ? req.body.password : '';
  if (!pass) res.status(500).json({
    error: 'error while hashing password'
  });

  const salt = _bcrypt.default.genSaltSync(10);

  const hash = _bcrypt.default.hashSync(pass, salt);

  if (!hash) {
    console.error('error while encrypting password');
    res.status(500).json({
      error: 'error while hashing password'
    });
  }

  const user = new _user.default({
    email: req.body.email,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    created_date: new Date()
  });
  const savedUser = await user.save();
  if (!savedUser) res.status(500).json({
    error: error
  });
  res.status(201).json({
    userSaved: savedUser
  });
};