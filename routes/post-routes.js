const express = require("express");
const router = express.Router();

const {
    getOnePost,
    deletePost,
    getAllPosts,
    getAddPost,
    postAddPost,
    getEditPost,
    putEditPost,
} = require("../controllers/post-controllers.js");

router.get("/posts", getAllPosts);
router.route("/posts/:id").get(getOnePost).delete(deletePost);
router.route("/add-post").get(getAddPost).post(postAddPost);
router.route("/edit/:id").get(getEditPost).put(putEditPost);

module.exports = router;
