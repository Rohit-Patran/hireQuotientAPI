import jwt from "jsonwebtoken"; // to generate user signin token
import {expressjwt} from "express-jwt"; //to use the generated token, authenticate it, and make the user signin 
import errorHandler from "../middlewares/dbErrorHandler.js";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

function signup(request , response) 
{   
    const user = new User(request.body);
    user.save()
    .then(user => {
        const {hashed_password , salt , ...rest} = user.toObject();
        response.send(rest);
    })
    .catch(error => response.json(errorHandler(error)));
};

function signin(request , response)
{
    const {email , password} = request.body;

    //step 1: find user with unique attribute:
    User.findOne({email})
    .then(user => {
        if(!user.authenticate(password))
        {
            return response.status(401).json({error : "Email and password don't match"});
        }
        //step 2 : generate jwt token
        const token = jwt.sign({_id : user._id} , process.env.JWT_SECRET);
        response.cookie("t" , token , {expire : new Date() + 9999}); //save the token with a name in the cookies

        //step 3: return the existing user
        const {_id , name , email} = user;
        response.json({token : token , user : {_id , name , email}})
    })
    .catch(error => response.status(400).json({error : "user with the email does not exist."})); // if the user does not exist give appropiate message
}

function signout(request , response)
{
    response.clearCookie("t");
    response.json({message : "signout successful"})
}

const requireSignin = expressjwt({
        secret : process.env.JWT_SECRET,
        algorithms: ["HS256"],
        userProperty: "auth",
});

function isAuth(request , response , next)
{
    let user = request.profile && request.auth && request.profile._id == request.auth._id;
    if(!user)
    {
        return response.status(403).json({error : "Access denied !"});
    }
    next();
}

export { signup , signin , signout , requireSignin , isAuth };