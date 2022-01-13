import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  login: String,
  password: String,
})

export default mongoose.model('user', userSchema);
