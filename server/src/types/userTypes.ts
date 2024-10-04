import { Schema } from "mongoose";

export type TUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  contactNo: string;
  avatar: string,
  country: string,
  coordinate: number[];
  socialScore: Schema.Types.ObjectId[];
};
