import express from "express";
import userSignupValidator from "../middlewares/userValidator.js";
import * as controller from "../controllers/user.js";
import { signup , signin , signout , requireSignin , isAuth } from "../controllers/auth.js"

const userRouter = express.Router();

userRouter.param("userId" , controller.userById);
userRouter.post("/signup" , userSignupValidator , signup);
userRouter.post("/signin" , signin);
userRouter.get("/:userId/signout" , requireSignin, isAuth, signout);
userRouter.put("/update/:userId" , requireSignin, isAuth, controller.updateUser, controller.readUser);
userRouter.delete("/delete/:userId" , requireSignin, isAuth, controller.deleteUser);
userRouter.get("/:userId/allusers" , requireSignin, isAuth, controller.readAllUsers);

export default userRouter;