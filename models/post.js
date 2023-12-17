import mongoose from "mongoose";
const postSchema = {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Object, ref: 'User', required: true },
    comments: [{ type: Object, ref: 'Comment' }]
}
const PostSchema = new mongoose.Schema(postSchema , {timestamps : true});

const Post = mongoose.model('Post', PostSchema);

export default Post;
