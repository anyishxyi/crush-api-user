"use strict";

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * Get all users
 */
exports.getAll = async (req, res, next) => {
  try {
    const users = await _user.default.find().catch(error => {
      res.status(500).json({
        error: error
      });
    });

    if (!users) {
      return res.status(404).json({
        error: new Error('Users not found!')
      });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      msg: error
    });
  }
};