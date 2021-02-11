require('dotenv').config();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
const userData = { 
	email: "test-unit@crush.io",
	password: "testtesttest",
	firstName: "firstName", 
	lastName: "lastName",
	created_date: new Date()
};

var savedUser = null;

beforeAll(() => {
	mongoose.connect(process.env.__MONGO_URI__, { useUnifiedTopology: true, useNewUrlParser: true })
					.then(() => { console.log('\nSuccessully connected to MongoDB Atlas !\n')})
					.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));
});

describe('User Model Test', () => {
	it('create & save user successfully', async () => {
		const validUser = new UserModel(userData);
		savedUser = await validUser.save();

		expect(savedUser._id).toBeDefined();
		expect(savedUser.email).toBe(userData.email);
		expect(savedUser.firstName).toBe(userData.firstName);
		expect(savedUser.lastName).toBe(userData.lastName);
		// expect(savedUser.created_date).toBe(userData.created_date);
	});

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
})

afterAll( async () => {
	try {
		await UserModel.findByIdAndRemove(savedUser._id, (error) => { if(error) console.log(error); });	
	} catch (error) {
		console.error(error);
	}
})