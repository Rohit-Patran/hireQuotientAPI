import Post from "../models/post.js";
export default function postById(request ,response, next , id)
{
    Post.findById(id)
    .then(post => {
        request.post = post;
        next();
    })
    .catch(error => response.status(400).json({message : "user not found" , error: error})
    )
}