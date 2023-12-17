import express from "express";
import { createPost, deletePost, updatePost, allPosts } from "../controllers/post.js";
import postValidator from "../middlewares/postValidator.js";
import { userById } from "../controllers/user.js";
import { isAuth, requireSignin } from "../controllers/auth.js";
import postById from "../middlewares/postById.js";
const postRouter = express.Router();

//post routes
postRouter.param("userId" , userById);
postRouter.param("postId" , postById);
postRouter.post("/create/:userId" , requireSignin , isAuth, postValidator, createPost);
postRouter.put("/update/:postId/:userId" , requireSignin , isAuth, updatePost);
postRouter.delete("/delete/:postId/:userId" , requireSignin , isAuth, deletePost);
postRouter.get("/allposts/:userId" , requireSignin , isAuth, allPosts);

export default postRouter;