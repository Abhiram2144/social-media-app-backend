const mongoose = require('mongoose');

/**
 * @typedef {import('mongoose').Schema} Schema
 * @typedef {import('mongoose').Model} Model
 */

/**
 * @typedef {Object} Post
 * @property {string} title - The title of the post.
 * @property {string} post - The content of the post.
 * @property {string} uid - The user ID associated with the post.
 * @property {Date} createdAt - The timestamp when the post was created.
 * @property {Date} updatedAt - The timestamp when the post was last updated.
 */

/**
 * @type {Schema<Post, Model<Post>>}
 */
const PostSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
        },
        post:
        {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Posts',PostSchema);