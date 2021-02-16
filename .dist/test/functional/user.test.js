"use strict";

// const express = require("express"); // import express
// const userRoutes = require("../../routes/user"); //import file we are testing
const supertest = require("supertest"); // supertest is a framework that allows to easily test web apis
// const app = express(); //an instance of an express app, a 'fake' express app


const app = require("../../app"); //an instance of an express app, a 'fake' express app


const request = supertest(app); // app.use("/api-crush-user", userRoutes); //routes

describe("testing-server-routes", () => {
  it("GET /states - success", async done => {
    const {
      res
    } = await request.get("api-crush-user/user");
    console.log('res', res);
    expect(res.status).toBe(200); // expect(res).toEqual([
    // 	{
    // 		"_id": "602aee340026fab6a71df1e3",
    // 		"email": "test10@test.cd",
    // 		"password": "$2b$10$jWzbZYjLVmE9c2E0MzWc4.sNY8L/kWkOzodzxtgis6xCIb7hqgxYy",
    // 		"firstName": "firstName",
    // 		"lastName": "lastName",
    // 		"created_date": "Mon Feb 15 2021 22:57:08 GMT+0100 (heure normale d’Europe centrale)",
    // 		"__v": 0
    // 	}
    // ]);

    done();
  });
});