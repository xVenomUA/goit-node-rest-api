import { Router } from "express";
import {
  getCurrent,
  logIn,
  logout,
  register,
  resendEmail,
  updateAvatar,
} from "../controllers/userControllers.js";

import {
  authenticate,
  checkEmailVerification,
  checkUserDataLogIn,
  checkUserDataSingUp,
  uploadAvatar,
} from "../middlewares/userMiddlewares.js";
import { verifyEmail } from "../services/emailSeriveces.js";

const usersRouter = Router();

usersRouter.post("/register", checkUserDataSingUp, register);
usersRouter.post("/login", checkUserDataLogIn, logIn);

usersRouter.post("/logout", authenticate, logout);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.patch("/avatars", authenticate, uploadAvatar, updateAvatar);

usersRouter.get("/verify/:verificationToken", verifyEmail);
usersRouter.post("/verify", checkEmailVerification, resendEmail);

export default usersRouter;
