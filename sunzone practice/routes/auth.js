/**
 * Express router object.
 * @type {import("express").Router}
 */
const router = require("express").Router();

/**
 * User model for posters.
 * @type {import("../models/user.model")}
 */
const Poster = require("../models/user.model");

/**
 * User model for responders.
 * @type {import("../models/responder.user.model")}
 */
const Responder = require("../models/responder.user.model");

/**
 * Bcrypt library for password hashing.
 * @type {import("bcrypt")}
 */
const bcrypt = require("bcrypt");

/**
 * Registers a new poster user.
 * @name POST /poster/register
 * @function
 * @memberof module:routes/auth~router
 * @inner
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware function
 */
router.post("/poster/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new Poster({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        const user = await newUser.save();
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * Logs in a poster user.
 * @name POST /poster/login
 * @function
 * @memberof module:routes/auth~router
 * @inner
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware function
 */
router.post("/poster/login", async (req, res) => {
    try {
        const user = await Poster.findOne({ email: req.body.email });
        !user && res.status(400).json("Wrong credentials!");
        // if username exists check password
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");
        // if password is correct
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * Registers a new responder user.
 * @name POST /responder/register
 * @function
 * @memberof module:routes/auth~router
 * @inner
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware function
 */
router.post("/responder/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new Responder({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        const user = await newUser.save();
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * Logs in a responder user.
 * @name POST /responder/login
 * @function
 * @memberof module:routes/auth~router
 * @inner
 * @param {string} path - Express route path
 * @param {callback} middleware - Express middleware function
 */
router.post("/responder/login", async (req, res) => {
    try {
        const user = await Responder.findOne({ email: req.body.email });
        !user && res.status(400).json("Wrong credentials!");
        // if username exists check password
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");
        // if password is correct
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;