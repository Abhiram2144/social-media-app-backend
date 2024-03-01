/**
 * @file User Routes
 * @description Contains routes related to user management for the admin users.
 */

const User = require("../models/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

/**
 * @route GET /admin/posters
 * @description Get all users
 * @access Public
 */
router.get("/admin/posters", async (req, res) => {
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
 * @route GET /poster/email/:email
 * @description Get user details by email
 * @access Public
 */
router.get("/poster/email/:email", async (req, res) => {
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
 * @route GET /admin/poster/:id
 * @description Get user by ID
 * @access Public
 */
router.get("/admin/poster/:id", async (req, res) => {
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
 * @route POST /admin/poster/add
 * @description Create a new user
 * @access Public
 */
router.post("/admin/poster/add", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
    });
    const { password, ...others } = newUser._doc;
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
 * @route PUT /admin/poster/update/:id
 * @description Update user details
 * @access Public
 */
router.put("/admin/poster/update/:id", async (req, res) => {
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
 * @route DELETE /admin/poster/delete/:id
 * @description Delete a user
 * @access Public
 */
router.delete("/admin/poster/delete/:id", async (req, res) => {
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
