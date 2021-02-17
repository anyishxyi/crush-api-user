import User from '../models/user';

/**
  * update user info
 */
exports.updateUser = async (req, res, next) => {
  try {
    if ( !req.params.id || !req.body.email ) return res.status(422).json({ msg: 'Missing required argument' });
    console.log('id : ', req.params.id)
    let updateUser = {}
    if (req.params.id) updateUser._id = req.params.id
    if (req.body.email) updateUser.email = req.body.email
    if (req.body.password) updateUser.password = req.body.password
    if (req.body.firstName) updateUser.firstName = req.body.firstName
    if (req.body.lastName) updateUser.lastName = req.body.lastName
    if (req.body.created_date) updateUser.created_date = req.body.created_date

    const query = { '_id': updateUser._id }

    await User.findOneAndUpdate(query, updateUser, {upsert: true}, (err, updatedUser) => {
        if (err) return res.send(500, {error: err});
        return res.status(200).json({ user: updatedUser });
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}