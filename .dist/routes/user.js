"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/user', _user.default.signup);
router.post('/login', _user.default.login);
router.get('/user', _user.default.users);
router.get('/user/:id', _user.default.getUser);
var _default = router;
exports.default = _default;