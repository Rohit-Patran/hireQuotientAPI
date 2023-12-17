import Post from "../models/post.js";

function createPost(request , response)
{
    const post = new Post({...request.body , author : {_id : request.profile._id , name : request.profile.name}});
    post.save()
    .then(post => {
        if(!post)
        {
            return Promise.reject(new Error("post not created !"));
        }
        response.status(201).json({message : "post created succesfully" , postData : post})
    })
    .catch(error => response.status(500).json({message : `Error occured !` , error : error.message}));
}

function updatePost(request , response)
{
    Post.findByIdAndUpdate(request.post._id , {...request.body , author : {_id : request.profile._id , name : request.profile.name}} , {new : true})
    .then(post => {
        if(!post)
        {
            return Promise.reject(new Error("post not updated !"));
        }
        response.status(200).json({message : "post updated succesfully !" , postData : post})
    })
    .catch(error => response.status(500).json({message : "error occured !" , error : error.message}));
}

function deletePost(request , response)
{
    Post.findByIdAndDelete(request.post._id)
    .then(deletedPost => {
        if(!deletedPost)
        {
            return Promise.reject(new Error("Post not deleted !"));
        }
        response.status(200).json({message : "post deleted succesfully !"});
    })
    .catch(error => response.status(500).json({message : "error occured !" , error : error.message}));
}

async function allPosts(request , response)
{
    const posts = await Post.find()
                            .select("-__v")
                            .exec()
    if(posts)
    {
        response.status(200).json({posts : posts});
    }
}
export { createPost , updatePost, deletePost, allPosts};