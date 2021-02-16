"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * Login user
 */
exports.login = (req, res, next) => {
  _user.default.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.status(401).json({
        error: new Error('User not found!')
      });
    }

    _bcrypt.default.compare(req.body.password, user.password).then(valid => {
      if (!valid) {
        return res.status(401).json({
          error: new Error('Incorrect password!')
        });
      }

      const token = _jsonwebtoken.default.sign({
        userId: user._id
      }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h'
      });

      res.status(200).json({
        userId: user._id,
        token: token
      });
    }).catch(error => {
      res.status(500).json({
        error: error
      });
    });
  }).catch(error => {
    res.status(500).json({
      error: error
    });
  });
};