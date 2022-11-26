const Post = require("../models/post.js");

const getAllPosts = (req, res) => {
    Post.find()
        .sort({ createdAt: -1 })
        .then((data) => res.json(data))
        .catch((err) => handleError(res, err));
};

const getOnePost = (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then((post) => res.json(post))
        .catch((err) => handleError(res, err));
};
const deletePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndDelete(id)
        .then((post) => res.json(post))
        .catch((err) => handleError(res, err));
};

const addPost = (req, res) => {
    const { title, author, text } = req.body;
    new Post({ title, author, text })
        .save()
        .then((post) => res.json(post))
        .catch((err) => handleError(res, err));
};

const editPost = (req, res) => {
    const { title, author, text } = req.body;
    Post.findByIdAndUpdate(
        req.params.id,
        { title, author, text },
        { new: true }
    )
        .then((post) => res.json(post))
        .catch((err) => handleError(res, err));
};

module.exports = {
    getOnePost,
    deletePost,
    getAllPosts,
    addPost,
    editPost,
};

const handleError = (res, err) => {
    res.status(500).send(err);
};
