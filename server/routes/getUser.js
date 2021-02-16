import User from '../models/user';

/**
  * Get a user info
 */
exports.getUser = async (req, res, next) => {
  try {
    const userID = req.params.id ? req.params.id : '';
    if (userID === '') res.status(404).json({ msg: 'user not found !' });

    const user = await User.findOne({_id: userID}).catch((error) => { res.status(500).json({ error: error }); });
    
    if (!user) {
      return res.status(404).json({
        error: new Error('User not found!')
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}