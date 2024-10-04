export interface TUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  contactNo: string;
  avatar: string;
  country: string;
  coordinate: number[];
  socialScore: Schema.Types.ObjectId[];
};

declare global {
  namespace Express {
    interface User extends TUser {}

    interface Request {
      user: User
    }
  }
}

