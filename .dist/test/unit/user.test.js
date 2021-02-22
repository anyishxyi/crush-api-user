"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const userData = {
  email: "test-unit1@crush.fr",
  password: "testtesttest",
  firstName: "firstName",
  lastName: "lastName",
  created_date: new Date()
};
var savedUser = null;
beforeAll(() => {
  _mongoose.default.connect(process.env.__MONGO_URI__, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
    /*console.log('\nSuccessully connected to MongoDB Atlas !\n')*/
  }).catch(error => console.error('\nUnable to connect to MongoDB Atlas\n', error));
});
describe('User Model Unit Test', () => {
  it('create & save user successfully', async () => {
    const validUser = new _user.default(userData);
    savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
  });
  it('get all users', async () => {
    const users = await _user.default.find();
    expect(users.length).toBeDefined();
  });
  it('get user info', async () => {
    const userFound = await _user.default.findOne({
      _id: savedUser._id
    });
    expect(userFound._id.toString()).toBe(savedUser._id.toString());
    expect(userFound.email).toBe(savedUser.email);
    expect(userFound.firstName).toBe(savedUser.firstName);
    expect(userFound.lastName).toBe(savedUser.lastName);
  });
  it('update user info', async () => {
    const updateUser = {
      firstName: 'newFirstName'
    };
    const query = {
      '_id': savedUser._id
    };
    const updatedUser = await _user.default.findOneAndUpdate(query, updateUser, {
      returnOriginal: false
    });
    if (!updatedUser) return res.send(500, {
      error: err
    });
    expect(updatedUser._id.toString()).toBe(savedUser._id.toString());
    expect(updatedUser.email).toBe(savedUser.email);
    expect(updatedUser.firstName).toBe(savedUser.firstName);
    expect(updatedUser.lastName).toBe(savedUser.lastName);
  }); // it('find a user by id', async () => {
  // 	const salt = bcrypt.genSaltSync(10);
  // 	const hash = bcrypt.hashSync(userData.password, salt);
  // 	if(!hash) {
  // 		console.error('error while encrypting password');
  // 		exit(1);
  // 	}
  // 	const validUser = new UserModel(userData);
  // 	savedUser = await validUser.save();
  // 	expect(savedUser._id).toBeDefined();
  // 	expect(savedUser.email).toBe(userData.email);
  // 	expect(savedUser.firstName).toBe(userData.firstName);
  // 	expect(savedUser.lastName).toBe(userData.lastName);
  // 	expect(savedUser.created_date).toBe(userData.created_date);
  // });
  // it('find a user by id', async () => {
  // 	const salt = bcrypt.genSaltSync(10);
  // 	const hash = bcrypt.hashSync(userData.password, salt);
  // 	if(!hash) {
  // 		console.error('error while encrypting password');
  // 		exit(1);
  // 	}
  // 	const validUser = new UserModel(userData);
  // 	savedUser = await validUser.save();
  // 	expect(savedUser._id).toBeDefined();
  // 	expect(savedUser.email).toBe(userData.email);
  // 	expect(savedUser.firstName).toBe(userData.firstName);
  // 	expect(savedUser.lastName).toBe(userData.lastName);
  // 	expect(savedUser.created_date).toBe(userData.created_date);
  // });
});
afterAll(async () => {
  try {
    await _user.default.findOneAndDelete({
      _id: savedUser._id
    });
    await _mongoose.default.disconnect(); // console.log('\nSuccessully disconnected to MongoDB Atlas !\n')
  } catch (error) {
    console.error(error);
  }
});