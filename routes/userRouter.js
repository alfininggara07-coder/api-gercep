import express from "express";
import { userAuthentication } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/user/auth/login", userAuthentication);


export default userRouter;
