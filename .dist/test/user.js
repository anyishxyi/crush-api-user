"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const userData = {
  email: "test29@test.com",
  password: "testtesttest"
};
describe('User Model Test', () => {
  beforeAll(() => {
    _mongoose.default.connect(process.env.__MONGO_URI__, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }).then(() => {
      console.log('\nSuccessully connected to MongoDB Atlas !\n');
    }).catch(error => console.error('\nUnable to connect to MongoDB Atlas\n', error));
  });
  it('create & save user successfully', async () => {
    const salt = _bcrypt.default.genSaltSync(10);

    const hash = _bcrypt.default.hashSync(userData.password, salt);

    if (!hash) {
      console.error('error while encrypting password');
      exit(1);
    }

    const validUser = new _user.default({
      email: userData.email,
      password: hash
    }); // console.log('validUser', validUser);

    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
  });
});