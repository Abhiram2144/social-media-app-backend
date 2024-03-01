/**
 * Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
 * It provides a straightforward, schema-based solution to model your application data.
 * @namespace mongoose
 */

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        comment:
        {
            type: String,
            required: true,
        },
        pid:
        {
            type: String,
            required: true,
        },
        rid: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('comments',CommentSchema);