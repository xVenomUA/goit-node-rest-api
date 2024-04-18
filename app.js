import express from "express";
import morgan from "morgan";
import cors from "cors"; 
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import  usersRouter  from "./routes/userRouter.js";

const app = express();
dotenv.config();
mongoose
.connect(process.env.MONDODB_URL)
.then(() => console.log("Database connection successful"))
.catch((error) => {
  console.log(error.message);
  process.exit(1); // вихід з програми
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use("/api/contacts", contactsRouter); 



app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
}); // відловлює  всі помилки
app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});