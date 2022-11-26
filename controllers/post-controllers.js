const Post = require("../models/post.js");

const getAllPosts = (req, res) => {
    const title = "Posts";
    Post.find()
        .sort({ createdAt: -1 })
        .then((posts) => {
            res.render("posts", { title, posts });
        });
};

const getOnePost = (req, res) => {
    const title = "Post";
    const { id } = req.params;
    Post.findById(id)
        .then((post) => {
            res.render("post", { title, post });
            console.log(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render("error", {
                title: "Post",
                statusCode: res.statusCode,
                error: "Couldn't find post",
            });
        });
};
const deletePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndDelete(id)
        .then((data) => {
            console.log(data);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render("error", {
                title: "Couldn't fetch post",
                statusCode: res.statusCode,
                error: "Couldn't delete post",
            });
        });
};

const getAddPost = (req, res) => {
    const title = "Add Post";
    res.render("add-post", { title });
};
const postAddPost = (request, response) => {
    const { title, author, text } = request.body;
    new Post({ title, author, text })
        .save()
        .then((data) => response.status(304).redirect("/posts"))
        .catch((err) => {
            console.log(err);
            response.status(500).render("error", {
                title: "Error",
                statusCode: response.statusCode,
                error: "Couldn't add post",
            });
        });
};

const getEditPost = (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then((post) => {
            res.render("edit-post", {
                title: "Edit",
                post,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render("error", {
                title: "Couldn't get the post",
                statusCode: res.statusCode,
                error: "Couldn't get the post",
            });
        });
};
const putEditPost = (req, res) => {
    const id = req.params.id;
    const { title, author, text } = req.body;
    Post.findByIdAndUpdate(id, { title, author, text })
        .then((data) => {
            res.status = 200;
            res.redirect(`/posts/${id}`);
        })
        .catch((err) => {
            console.log(err);
            res.render("error", {
                title: "Couldn't update the post",
                statusCode: res.statusCode,
                error: "Couldn't update the post",
            });
        });
};

module.exports = {
    getOnePost,
    deletePost,
    getAllPosts,
    getAddPost,
    postAddPost,
    getEditPost,
    putEditPost,
};
