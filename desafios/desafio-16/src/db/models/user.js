import mongoose from 'mongoose';

const schema_user = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

export default mongoose.model('users', schema_user);
