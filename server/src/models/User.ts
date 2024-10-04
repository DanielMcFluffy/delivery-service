import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    contactNo: String,
    avatar: String,
    country: String,
    coordinate: [Number],
    socialScore: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
