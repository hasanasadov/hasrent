export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  favorites: string[];
  googleId?: string;
  password?: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpires?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
