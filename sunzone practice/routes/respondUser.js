/**
 * @file This file contains the routes for managing user operations in the application.
 * @module respondUser
 */

const User = require("../models/responder.user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

/**
 * GET route to fetch all admin users.
 * @name GET/admin/responders
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the list of users.
 */
router.get("/admin/responders", async (req, res) => {
    let user;
    try {
        user = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "NO users found! " });
    }
    return res
        .status(200)
        .json({ message: "successfully fetched the users details", data: user });
});

/**
 * GET route to fetch a user by email.
 * @name GET/responders/email/:email
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the user details.
 */
router.get("/responders/email/:email", async (req, res) => {
    let userEmail = req.params.email;
    let user;
    try {
        user = await User.findOne({ email: userEmail });
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "NO users found! " });
    }
    return res
        .status(200)
        .json({ message: "successfully fetched the users details", data: user });
});

/**
 * GET route to fetch a user by ID.
 * @name GET/admin/responders/:id
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the user details.
 */
router.get("/admin/responders/:id", async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id);
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    const { password, ...others } = user._doc;
    return res
        .status(200)
        .json({ message: "successfully fetched the user details", data: others });
});

/**
 * POST route to create a new user.
 * @name POST/admin/responders/add
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the created user details.
 */
router.post("/admin/responders/add", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
    });
    const { password, ...others } = user._doc;
    newUser
        .save()
        .then((user) => {
            return res
                .status(200)
                .json({ message: "successfully created the user", data: others });
        })
        .catch((err) => {
            console.log(err);
        });
});

/**
 * PUT route to update a user.
 * @name PUT/admin/responders/update/:id
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the updated user details.
 */
router.put("/admin/responders/update/:id", async (req, res) => {
    let user;
    // if password is to be edited
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const { username, email, pass } = req.body;
    try {
        user = await User.findById(req.params.id);
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    // update the user info:
    user = await User.findByIdAndUpdate(
        req.params.id,
        {
            username,
            email,
            password: req.body.password,
        },
        { new: true }
    );

    // remove password and send the rest data as response
    const { password, ...others } = user._doc;
    return res
        .status(200)
        .json({ message: "successfully updated the user", data: others });
});

/**
 * DELETE route to delete a user.
 * @name DELETE/admin/responders/delete/:id
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message.
 */
router.delete("/admin/responders/delete/:id", async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id);
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "successfully deleted the user" });
});

module.exports = router;
