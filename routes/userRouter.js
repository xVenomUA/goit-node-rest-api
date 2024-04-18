import { Router } from "express";
import { logIn, register } from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import { signUpSchema } from "../schemas/authSchemas.js";
import { checkUserDataLogIn, checkUserDataSingUp } from "../middlewares/userMiddlewares.js";


const usersRouter = Router();

usersRouter.post("/register", checkUserDataSingUp , register);
usersRouter.post("/login", checkUserDataLogIn, logIn);
usersRouter.post("/logout");
usersRouter.get("/current");

export default usersRouter;
