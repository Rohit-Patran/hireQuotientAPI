import mongoose from "mongoose";
const commentSchema = {
    content: { type: String, required: true },
    author: { type: Object, ref: 'User', required: true }
}
const CommentSchema = new mongoose.Schema(commentSchema , {timestamps : true});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
