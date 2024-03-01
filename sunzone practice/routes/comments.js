/**
 * @file This file contains the routes for handling comments related operations.
 */

const Comments = require("../models/comments.model");
const router = require("express").Router();

/**
 * Get all comments of all posts.
 * @route GET /comments
 * @returns {object} - Response object with message and data properties.
 */
router.get("/comments", async (req, res) => {
    let comments;
    try {
        comments = await Comments.find();
    } catch (err) {
        console.log(err);
    }
    if (!comments) {
        return res.status(404).json({ message: "No comments found!" });
    }
    return res
        .status(200)
        .json({ message: "Successfully fetched the post details", data: comments });
});

/**
 * Get all comments of a single post by post ID.
 * @route GET /posts/:pid/comments
 * @param {string} req.params.pid - The ID of the post.
 * @returns {object} - Response object with message and data properties.
 */
router.get("/posts/:pid/comments/", async (req, res) => {
    let comments;
    try {
        comments = await Comments.find({ pid: req.params.pid });
    } catch (err) {
        console.log(err);
    }
    if (!comments) {
        return res.status(404).json({ message: "Post not found!" });
    }

    return res
        .status(200)
        .json({ message: "Successfully fetched the comments", data: comments });
});

/**
 * Get all comments of a particular responder.
 * @route GET /responder/:rid/comments
 * @param {string} req.params.rid - The ID of the responder.
 * @returns {object} - Response object with message and data properties.
 */
router.get("/responder/:rid/comments", async (req, res) => {
    let comment;
    try {
        comment = await Comments.find({ rid: req.params.rid });
    } catch (err) {
        console.log(err);
    }
    if (!comment) {
        return res
            .status(404)
            .json({ message: "No comments found for this account!" });
    }

    return res
        .status(200)
        .json({ message: "Successfully fetched the comments", data: comment });
});

/**
 * Create a comment for a post with post ID.
 * @route POST /posts/:pid/comments/add
 * @param {string} req.params.pid - The ID of the post.
 * @param {string} req.body.comment - The comment text.
 * @param {string} req.body.rid - The ID of the responder.
 * @returns {object} - Response object with message and data properties.
 */
router.post("/posts/:pid/comments/add", async (req, res) => {
    const newComment = new Comments({
        comment: req.body.comment,
        rid: req.body.rid,
        pid: req.params.pid,
    });
    newComment
        .save()
        .then((post) => {
            return res
                .status(200)
                .json({ message: "Successfully created the post", data: post });
        })
        .catch((err) => {
            console.log(err);
        });
});

/**
 * Delete a comment by comment ID.
 * @route DELETE /posts/:pid/comments/delete/:id
 * @param {string} req.params.pid - The ID of the post.
 * @param {string} req.params.id - The ID of the comment.
 * @returns {object} - Response object with message property.
 */
router.delete("/posts/:pid/comments/delete/:id", async (req, res) => {
    let newComment;
    try {
        newComment = await Comments.findById(req.params.id);
    } catch (err) {
        console.log(err);
    }
    if (!newComment) {
        return res.status(404).json({ message: "Comment not found!" });
    }
    await Comments.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Successfully deleted the comment" });
});

module.exports = router;

