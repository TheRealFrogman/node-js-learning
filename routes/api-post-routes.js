const express = require("express");
const router = express.Router();

const {
    getOnePost,
    deletePost,
    getAllPosts,
    addPost,
    editPost,
} = require("../controllers/api-post-controllers.js");

router.get("/api/posts", getAllPosts);
router.route("/api/post/:id").get(getOnePost).delete(deletePost);
router.route("/api/post").post(addPost);
router.route("/api/post/:id").put(editPost);

module.exports = router;
