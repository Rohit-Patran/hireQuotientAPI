import User from "../models/user.js";
function userById(request , response , next, id)
{
    User.findById(id)
    .then(user => {
        if(!user)
        {
            return Promise.reject(new Error("User profile not found !"));
        }
        request.profile = user;
        next();
    })
    .catch(error => response.status(400).json({ error : "User not found" }));
}

function readUser(request , response)
{
    const {hashed_password , salt , ...rest} = request.profile.toObject();
    response.json({
        user : rest
    });
}

function updateUser(request , response, next)
{
    User.findByIdAndUpdate(request.profile._id , {...request.body} , {new : true})
    .then(user => {
        if(!user)
        {
            return Promise.reject(new Error("User profile not updated !"));
        }
        request.profile = user;
        next();
    })
    .catch(error => response.status(400).json({error : error.message}))
}

function deleteUser(request , response)
{
    User.findByIdAndDelete(request.profile._id)
    .then(deletedUser => 
        {
            if(!deletedUser)
            {
                return Promise.reject(new Error("User Profile not deleted !"))
            }
            response.status(200).send("User Profile Deleted Successfully !")
        }
    )
    .catch(error => {
        console.error(error);
        response.status(400).json({message : error.message});
    });
}

async function readAllUsers(request , response)
{
    const users = await User.find()
                            .select("-hashed_password")
                            .exec()
    if(users)
    {
        response.status(200).json({users : users});
    }
}
export { userById , readUser , updateUser , deleteUser, readAllUsers};