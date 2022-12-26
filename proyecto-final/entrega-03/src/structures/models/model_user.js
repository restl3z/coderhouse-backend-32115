import mongoose from 'mongoose';

const schema_user = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  address: String,
  age: Number,
  phone: Number,
});

export default mongoose.model('users', schema_user);
