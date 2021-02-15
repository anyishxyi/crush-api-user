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

/**
  * Login user
 */
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
}

/**
  * Get all users
 */
exports.users = async (req, res, next) => {
  try {
    const users = await User.find().catch((error) => { res.status(500).json({ error: error }); });
    if (!users) {
      return res.status(404).json({ error: new Error('Users not found!') });
    }
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

/**
  * Get a user info
 */
exports.getUser = async (req, res, next) => {
  try {
    const userID = req.parms.id ? req.parms.id : '';
    if (userID === '') res.status(404).json({ msg: 'user not found !' });

    const user = await User.findOne({_id: userID}).catch((error) => { res.status(500).json({ error: error }); });
    
    if (!user) {
      return res.status(404).json({
        error: new Error('User not found!')
      });
    }
    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}