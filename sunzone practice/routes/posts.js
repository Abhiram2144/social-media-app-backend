
/**
 * @file This file contains the routes for handling posts in the application.
 */

const Posts = require("../models/posts.model");
const router = require("express").Router();

/**
 * Get all posts.
 * @route GET /posts
 * @returns {object} - Returns a JSON object containing the message and the post details.
 * @throws {object} - Returns a JSON object containing the error message if an error occurs.
 */
router.get("/posts", async (req, res) => {
    let posts;
    try {
        posts = await Posts.find();
    } catch (err) {
        console.log(err);
    }
    if (!posts) {
        return res.status(404).json({ message: "NO Posts found! " });
    }
    return res
        .status(200)
        .json({ message: "successfully fetched the post details", data: posts });
});

/**
 * Get a single post by id.
 * @route GET /posts/id/:id
 * @param {string} id - The id of the post.
 * @returns {object} - Returns a JSON object containing the message and the post details.
 * @throws {object} - Returns a JSON object containing the error message if an error occurs.
 */
router.get("/posts/id/:id", async (req, res) => {
    let post;
    try {
        post = await Posts.findById(req.params.id);
    } catch (err) {
        console.log(err);
    }
    if (!post) {
        return res.status(404).json({ message: "Post not found!" });
    }
    const { password, ...others } = post._doc;
    return res
        .status(200)
        .json({ message: "successfully fetched the post details", data: others });
});

/**
 * Get all posts with uid.
 * @route GET /posts/uid/:uid
 * @param {string} uid - The uid of the user.
 * @returns {object} - Returns a JSON object containing the message and the post details.
 * @throws {object} - Returns a JSON object containing the error message if an error occurs.
 */
router.get("/posts/uid/:uid", async (req, res) => {
    let post;
    try {
        post = await Posts.find({ uid: req.params.uid });
    } catch (err) {
        console.log(err);
    }
    if (!post) {
        return res
            .status(404)
            .json({
                message:
                    "No posts found for this account!! Try posting something, its fun :)",
            });
    }

    return res
        .status(200)
        .json({ message: "successfully fetched the post details", data: post });
});

/**
 * Get comments for a post.
 * @route GET /posts/:id/comments
 * @param {string} id - The id of the post.
 * @returns {object} - Returns a JSON object containing the message and the comments.
 * @throws {object} - Returns a JSON object containing the error message if an error occurs.
 */
router.get("/posts/:id/comments", async (req, res) => {
    let post;
    try {
        post = Posts.findById(req.params.id);
    } catch (err) {
        console.log(err);
    }
    if (!post) {
        return res.status(404).json({ message: "Post not found! " });
    }
    return res
        .status(200)
        .json({ message: "successfully fetched the comments", data: post.comments });
});

/**
 * Create a new post.
 * @route POST /posts/add
 * @param {string} uid - The uid of the user.
 * @param {string} title - The title of the post.
 * @param {string} post - The content of the post.
 * @returns {object} - Returns a JSON object containing the message and the created post.
 * @throws {object} - Returns a JSON object containing the error message if an error occurs.
 */
router.post("/posts/add", async (req, res) => {
    const newPost = new Posts({
        uid: req.body.uid,
        title: req.body.title,
        post: req.body.post,
    });
    newPost
        .save()
        .then((post) => {
            return res
                .status(200)
                .json({ message: "successfully created the post", data: post });
        })
        .catch((err) => {
            console.log(err);
        });
});

/**
 * Delete a post.
 * @route DELETE /posts/delete/:pid
 * @param {string} pid - The id of the post.
 * @returns {object} - Returns a JSON object containing the message.
 * @throws {object} - Returns a JSON object containing the error message if an error occurs.
 */
router.delete("/posts/delete/:pid", async (req, res) => {
    let newPost;
    try {
        newPost = await Posts.findById(req.params.pid);
    } catch (err) {
        console.log(err);
    }
    if (!newPost) {
        return res.status(404).json({ message: "Post not found!" });
    }
    await Posts.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "successfully deleted the post" });
});

module.exports = router;
