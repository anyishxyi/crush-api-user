import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
  * create new user
 */
exports.signup = async (req, res, next) => {
  const pass = req.body.password ? req.body.password : '';
  if(!pass) res.status(500).json({ error: 'error while hashing password' });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);

  if(!hash) {
    console.error('error while encrypting password');
    res.status(500).json({ error: 'error while hashing password' });   
  }

  const user = new User({ email: req.body.email, password: hash, firstName: req.body.firstName, lastName: req.body.lastName, created_date: new Date() });
  const savedUser = await user.save();

  if(!savedUser) res.status(500).json({ error: error });

  res.status(201).json({ userSaved: savedUser });
};