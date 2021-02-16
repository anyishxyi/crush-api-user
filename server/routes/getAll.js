import User from '../models/user';

/**
  * Get all users
 */
 exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().catch((error) => { res.status(500).json({ error: error }); });
    if (!users) {
      return res.status(404).json({ error: new Error('Users not found!') });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}