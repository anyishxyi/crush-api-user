"use strict";

const express = require('express');

const signup = require('../routes/signup');

const getAll = require('../routes/getAll');

const getUser = require('../routes/getUser');

const updateUser = require('../routes/updateUser');

const login = require('../routes/login');

const router = express.Router();
router.post('/login', login.login);
router.post('/', signup.signup);
router.get('/', getAll.getAll);
router.get('/:id', getUser.getUser);
router.put('/:id', updateUser.updateUser);
module.exports = router;