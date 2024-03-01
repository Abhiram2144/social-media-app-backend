const mongoose = require('mongoose');

/**
 * UserSchema represents the schema for the User model.
 *
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {Date} createdAt - The timestamp when the user was created.
 * @property {Date} updatedAt - The timestamp when the user was last updated.
 */
const UserSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('User',UserSchema);