import { asyncCatch } from "../helpers/asynCatch.js";
import { signUp } from "../services/userServices.js";

export const register = asyncCatch(async (req, res) => {
    const newUser = await signUp(req.body); 
    res.status(201).json(newUser); 
}); 

export const logIn = asyncCatch(async (req, res) => {
    res.status(200).json("LogIn");
}); 