import mongoose from "mongoose";
import crypto from "crypto";
import * as uuid from "uuid";

const userSchema = {
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    hashed_password : {
        type : String,
        required : true,
    },
    salt : {
        type : String
    }
};
const UserSchema = new mongoose.Schema(userSchema, {timestamps : true});
UserSchema.virtual("password")
.set(function(password) {
    this._password = password;
    this.salt = uuid.v1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function() {
    return this._password;
})

UserSchema.methods = {
    authenticate : function(password)
    {
        return this.encryptPassword(password) === this.hashed_password;
    },
    encryptPassword : function(password) 
    {
        if(!password) return '';

        try {
            return crypto.createHmac('sha1' , this.salt)
            .update(password)
            .digest('hex')
        } catch (error) {
            return ''
        }
    }
}

const User = mongoose.model("User" , UserSchema);

export default User;