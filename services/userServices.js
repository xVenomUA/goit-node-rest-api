import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import { sendEmail } from "./emailSeriveces.js";
import { ImageService } from "./imageServices.js";
import { createToken, verifyToken } from "./jwtServices.js";
import bcrypt from "bcryptjs";
export const signUp = async (data) => {
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...data,
    verificationToken,
  });
  const email = await sendEmail(newUser.email, newUser.verificationToken);

  if (!email) {
    throw new HttpError(500, "Email not send");
  }

  newUser.password = undefined;
  newUser.verificationToken = undefined;
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
  const { email, password} = data;

  const user = await User.findOne({ email }).select("+password");
  
  if (!user) throw new HttpError(401, "Email or password is wrong");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw new HttpError(401, "Email or password is wrong");
  if(!user.verify) throw new HttpError(401, "Please verify your email"); 

  const token = createToken(user._id);

  const userWithToken = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  userWithToken.password = undefined;

  return userWithToken;
};

export const updateImage = async (userData, user, file) => {
  if (file) {
    user.avatar = await ImageService.saveImage(
      file,
      {
        maxFileSize: 2,
        width: 250,
        height: 250,
      },
      "avatars"
    );
  }
  const updateUser = await User.findByIdAndUpdate(
    user.id,
    { avatarURL: user.avatar },
    { new: true }
  );

  return updateUser;
};
