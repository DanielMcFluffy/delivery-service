import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

export default User;