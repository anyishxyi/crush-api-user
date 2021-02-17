import mongoose from 'mongoose';
const supertest = require("supertest"); // supertest is a framework that allows to easily test web apis
import app from '../../app';
const request = supertest(app);

describe("testing-user-routes", () => {
  it("GET /user", async () => {
    const response = await request.get("/user");
		expect(response.text).toBeDefined()
		expect(response.status).toBe(200)
  });
});

afterAll( async () => {
	try {
		// await UserModel.findOneAndDelete({_id: savedUser._id});
		await mongoose.disconnect()
		console.log('\nSuccessully disconnected to MongoDB Atlas !\n')
	} catch (error) {
		console.error(error);
	}
})