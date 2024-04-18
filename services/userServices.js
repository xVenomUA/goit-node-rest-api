import { User } from "../models/usersModel.js";
import { createToken } from "./jwtServices.js";

export const signUp = async (data) => {
  const newUser = await User.create({
    ...data,
  });
  newUser.password = undefined;
  return newUser;
};

export const checkEmail = async (email) =>{ 
    const user = await User.findOne({ email });
    return user;
}

export const checkPassword = async (data) => {

};