import Comment from "../models/comment.js";
import Post from "../models/post.js";

function HandleCommentError(error , response)
{
    if (error instanceof TypeError && error.message.includes("Cast to ObjectId failed"))
        {
            response.status(400).json({error : "Invalid PostId or UserId !"});
        }
        if (error instanceof TypeError && error.message.includes("Cannot read properties of null"))
        {
            response.status(400).json({error : "PostId or UserId does not exist in DB !"});
        }
        else if(error.message === "User not Found !")
        {
            response.status(404).json({error : error.message});
        }
        else if(error.message === "Post not Found !")
        {
            response.status(404).json({error : error.message});
        }
        else
        {
            console
            response.status(500).json({error : "Internal Server Error !"});
        }
}

async function createComment(request , response)
{
    try {
        //step - 1 find the author using userId
        const user = request.profile;

        //step - 2 find the post where commenthas to be pushed
        const post = request.post;

        if (!user)
        {
            throw new Error("User not Found !");
        }
        else if (!post)
        {
            throw new Error("Post not Found !");
        }
        else
        {
            //step - 3 create the comment
            const comment = new Comment({...request.body , author : {_id : user._id , name : user.name}}); //setting the author details  -> name and userID
            comment.save()
            .then(comment => {
                if(!comment)
                {
                    return Promise.reject(new Error("Comment not added !"));
                }
                post.comments.unshift(comment.toObject()); //adding comments to respective post
                post.save()
                .then(post => {
                    if(!post)
                    {
                        return Promise.reject(new Error("comment not added to post !"));
                    }
                    response.status(201).json({message : "comment added succesfully !" , comment : comment , post : post})}
                )
                .catch(error => response.status(500).json({message : "Error occured" , error : error.message}));
            })
            .catch(error => response.status(500).json({message : "Error occured" , error : error}));
        }
    } catch (error) {
        HandleCommentError(error , response);
    }
};

async function updateComment(request , response)
{
    try {
        //step - 1 find the author using userId
        const user = request.profile;

        //step - 2 find the post where comment has to be pushed
        const post = request.post;

        //step - 3 find the comment to be updated
        const comment = request.comment;

        if (!user)
        {
            throw new Error("User not Found !");
        }
        else if (!post)
        {
            throw new Error("Post not Found !");
        }
        else if (!comment)
        {
            throw new Error("Comment not Found !");
        }
        else
        {
            //step - 4 update the comment
            Comment.findByIdAndUpdate(comment._id , {...request.body , author : {_id : user._id , name : user.name}}, {new : true}) //setting the author details  -> name and userID and updating the comment
            .then(async comment => {
                if(!comment)
                {
                    return Promise.reject(new Error("Comment not updated !"));
                }
                //update posts
                await Post.updateOne({id : post._id} , {$set : {content : request.body.content}});
                response.status(201).json({message : "comment updated succesfully !" , comment : comment , post : post});
            })
            .catch(error => response.status(500).json({message : "Error occured" , error : error.message}));

        }
    } catch (error) {
        HandleCommentError(error , response);
    }
};


function deleteComment(request , response)
{
    try {
        //step - 1 find the author using userId
        const user = request.profile;

        //step - 2 find the post where comment has to be deleted
        const post = request.post;

        //step - 3 find the comment to be deleted
        const comment = request.comment;

        if (!user)
        {
            throw new Error("User not Found !");
        }
        else if (!post)
        {
            throw new Error("Post not Found !");
        }
        else if (!comment)
        {
            throw new Error("Comment not Found !");
        }
        else
        {
            //step - 4 delete the comment
            Comment.findByIdAndDelete(comment._id) //deleting the comment
            .then(async () => {
                //update posts
                await Post.updateOne({_id : post._id} , {$pull : {comments: {_id : comment._id}}});
                response.status(201).json({message : "comment deleted succesfully !"});
            })
            .catch(error => response.status(500).json({message : "Error occured" , error : error.message}));

        }
    } catch (error) {
        HandleCommentError(error , response);
    }
} 

export { createComment , updateComment, deleteComment };