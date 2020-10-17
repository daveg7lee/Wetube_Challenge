import express from "express";
import { getChangePassword, getEditProfile, postEditProfile, userDetail } from "../controllers/userController";
import routes from "../routes";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar,postEditProfile)

userRouter.get(routes.changePassword,onlyPrivate, getChangePassword)
userRouter.post(routes.changePassword, onlyPrivate, postEditProfile)

userRouter.get(routes.userDetail(), userDetail);


export default userRouter;