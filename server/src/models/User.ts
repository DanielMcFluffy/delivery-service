import mongoose, { Schema } from "mongoose";
import { TUser } from "../types/userTypes";

const UserSchema = new mongoose.Schema<TUser>(
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
