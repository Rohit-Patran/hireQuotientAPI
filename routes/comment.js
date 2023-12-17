import express from "express";
import { userById } from "../controllers/user.js";
import postById from "../middlewares/postById.js";
import { isAuth, requireSignin } from "../controllers/auth.js";
import { createComment, deleteComment, updateComment } from "../controllers/comment.js";
import commentValidator from "../middlewares/commentValidator.js";
import commentById from "../middlewares/commentById.js";

const commentRouter = express.Router();
commentRouter.param("userId" , userById); //set "request.profile" object to find the author
commentRouter.param("postId" , postById); //set "request.post" object to find the post to which the comment has to be added
commentRouter.param("commentId" , commentById); //set "request.comment" object to find the comment to be updated

commentRouter.post("/add/:postId/:userId" , requireSignin , isAuth, commentValidator, createComment);
commentRouter.put("/update/:commentId/:postId/:userId" , requireSignin , isAuth, commentValidator, updateComment);
commentRouter.delete("/delete/:commentId/:postId/:userId" , requireSignin , isAuth, deleteComment);


export default commentRouter;