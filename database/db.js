import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbURL = process.env.DATABASE;

//db connection
const connection = async () => {
    await mongoose.connect(dbURL)
    .then(result => {
        if(!result)
        {
            return Promise.reject(new Error("Database Connection Error !"));
        }
        else
        {
            console.log("DB connected");
        }
    })
    .catch(error => console.error(error.message));
}

export default connection;