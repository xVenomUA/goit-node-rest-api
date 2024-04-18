import { Types } from "mongoose";
import { asyncCatch } from "../helpers/asynCatch.js";
import HttpError from "../helpers/HttpError.js";
import { Contacts } from "../models/contactsModel.js";
import { loginSchema, signUpSchema } from "../schemas/authSchemas.js";
import { checkEmail } from "../services/userServices.js";
import { verifyToken } from "../services/jwtServices.js";
import { User } from "../models/usersModel.js";

export const checkUserId = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) throw new HttpError(400);
  const contact = await Contacts.findById(id); 
  if (!contact || contact.owner.toString()!== req.user.id ) throw new HttpError(404);
  req.contact = contact;
  next();
}); 

export const checkUserBody = asyncCatch(async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    throw new HttpError(400, "Body must have at least one field");
  next();
});

export const checkFavorite = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contacts.findById(id);
  if (!contact || contact.owner.toString()!== req.user.id ) throw new HttpError(404);
  if (req.body.favourite === undefined)
    throw new HttpError(400, "Favorite field is missing");
  next();
});

export const checkUserDataSingUp = asyncCatch(async (req, res, next) => {
  const { value, errors } = signUpSchema(req.body);
  if (errors) throw new HttpError(400, errors.message);

  const emailCheck = await checkEmail(value.email);
  if (emailCheck) throw new HttpError(409, "Email in use");
  req.body = value;

  next();
});

export const checkUserDataLogIn = asyncCatch(async (req, res, next) => {
  const { value, errors } = loginSchema(req.body);
  if (errors) throw new HttpError(400, errors.message);

  req.body = value;
  next();
});

export const authenticate = asyncCatch(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) throw new HttpError(401);

  const id = verifyToken(token);
  const user = await User.findById(id);

  if (!user || !user.token || user.token !== token) throw new HttpError(401);
  req.user = user;
  next();
});

