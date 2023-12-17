import Comment from "../models/comment.js";
export default function commentById(request ,response, next , id)
{
    Comment.findById(id)
    .then(comment => {
        if(!comment)
        {
            return Promise.reject(new Error("No Comment Found for this commentID !"));
        }
        request.comment = comment;
        next();
    })
    .catch(error => response.status(400).json({error: error.message}));
}