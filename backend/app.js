import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { UserController, ShoesController } from "./Controllers/index.js";
import { ErrorValidation } from "./utils/ErrorValidation.js";
import CheckAuth from "./utils/CheckAuth.js";

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;
const DB_Connect = process.env.DATA_BASE_CONNECT;
console.log(DB_Connect);

mongoose
  .connect(`${DB_Connect}`)
  .then(() => {
    console.log("DB is working");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
//User
app.post("/signup", UserController.register);
app.post("/login", UserController.login);
app.get("/authMe", CheckAuth, UserController.auth);
app.post("/requestResetPassword", UserController.forgotPassword);
app.post("/tokenValidation", UserController.isTokenValid);
//ItemsLogic
app.post("/resetPassword", UserController.resetPassword);
app.get("/getShoes", ShoesController.getShoes);
app.post("/getMainSection", ShoesController.getMainSection);
app.listen(port, (err) => {
  if (err) {
    console.log("Error starting server", err);
  }
  console.log("Server Working");
});
