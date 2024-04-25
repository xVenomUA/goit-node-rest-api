import HttpError from "../helpers/HttpError.js";
import { asyncCatch } from "../helpers/asynCatch.js";
import { User } from "../models/usersModel.js";
import { sendEmail } from "../services/emailSeriveces.js";
import { checkUser, signUp, updateImage } from "../services/userServices.js";

import { MailService } from "@sendgrid/mail";

export const register = asyncCatch(async (req, res) => {
  const newUser = await signUp(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
});

export const logIn = asyncCatch(async (req, res) => {
  const user = await checkUser(req.body);
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const logout = asyncCatch(async (req, res) => {
    const { id } = req.user;        
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).send();
});

export const getCurrent = asyncCatch(async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });     
}); 

export const updateAvatar = asyncCatch(async (req, res) => {
  if(req.file === undefined) throw new HttpError(400, "Field of avatar with file not found");
    const user = await updateImage(req.body, req.user, req.file);
    res.status(200).json({avatarURL: user.avatarURL});
}); 

export const resendEmail = asyncCatch(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(404, "User not found");
  if (user.verify) throw new HttpError(400, "Verification has already been passed");

  const emailSend = await sendEmail(email, user.verificationToken);
  
  if (!emailSend) throw new HttpError(500, "Email not send");
  res.status(200).json({
    message: "Verification email sent",
  });
});
