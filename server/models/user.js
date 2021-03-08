import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  created_date: { type: String }
});

userSchema.plugin(uniqueValidator);

const userModel = new mongoose.model('User', userSchema);

export default userModel;