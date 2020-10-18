import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postRegisterView,
  postDelComment,
} from "../controllers/videoController";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment(), postAddComment);
apiRouter.post(routes.delComment(), onlyPrivate, postDelComment);

export default apiRouter;
