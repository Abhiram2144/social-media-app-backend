const mongoose = require("mongoose");

/**
 * Represents a responder user in the system.
 * @typedef {Object} responderUser
 * @property {string} username - The username of the responder user.
 * @property {string} email - The email of the responder user.
 * @property {string} password - The password of the responder user.
 */
const responderUser = mongoose.Schema({
    username: {
        type: String,
        min: [4,"Username must be at least 4 characters"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength : [8,"Password must be at least eight characters"],
    }
});

module.exports=new mongoose.model('responder',responderUser);