import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expressValidator from "express-validator";
import morgan from "morgan";
import connection from "./database/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/" , (request , response) => {
    response.status(200).send("<center><h1>Welcome to Node.js Backend !</h1></center>");
})

//middlewares
app.use(express.json());
app.use(expressValidator());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use("/api/user" , userRouter);
app.use("/api/post" , postRouter);
app.use("/api/comment" , commentRouter);

connection()
.then(() => {
    app.listen(PORT , () => console.log(`Backend Started @ PORT : ${PORT}`));
})
.catch(error => {
    console.error(error.message);
});