import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import { createToken, verifyToken } from "./jwtServices.js";
import bcrypt from "bcryptjs";
export const signUp = async (data) => {
  const newUser = await User.create({
    ...data,
  });
  newUser.password = undefined;
  return newUser;
};

export const checkEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const updateUserToken = async (id) => {
  const token = createToken(id);
  await User.findByIdAndUpdate(id, { token });
  return token;
};

export const checkUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new HttpError(401, "Email or password is wrong");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw new HttpError(401, "Email or password is wrong");

  const token = createToken(user._id);

  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  userWithToken.password = undefined;

  return userWithToken;
};

