require('dotenv').config();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
const userData = { email: "test29@test.com", password: "testtesttest" };

describe('User Model Test', () => {
	beforeAll(() => {
		mongoose.connect(process.env.__MONGO_URI__, { useUnifiedTopology: true, useNewUrlParser: true })
						.then(() => { console.log('\nSuccessully connected to MongoDB Atlas !\n')})
						.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));
	});

	it('create & save user successfully', async () => {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(userData.password, salt);

		if(!hash) {
			console.error('error while encrypting password');
			exit(1);
		}

		const validUser = new UserModel({ email: userData.email, password: hash });
		// console.log('validUser', validUser);
		const savedUser = await validUser.save();

		expect(savedUser._id).toBeDefined();
		expect(savedUser.email).toBe(userData.email);
	});
})