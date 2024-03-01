/**
 * This is the main entry point file for the MERN application.
 * It sets up the server, connects to the database, and defines the routes.
 */

const authRoute = require("./routes/auth");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors")
app.use(cors());

const CommentRouter = require("./routes/comments");
const Userrouter = require('./routes/user.route');
const Postrouter = require('./routes/posts');
const ResponderRouter = require("./routes/respondUser");

/**
 * Connects to the MongoDB database using the URL string from the environment variables.
 * Logs a success message if the connection is successful, otherwise logs the error.
 */
mongoose.connect(`${process.env.URL_STRING}`).then(console.log("Connected to Database successfully!")).catch((err)=>{console.log(err)});

/**
 * Starts the server and listens on the specified port.
 * Logs a message indicating the server is running.
 */
app.listen(5000,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})

// giving access to different routes

app.use("/",CommentRouter);
app.use('/',Postrouter);
app.use("/",Userrouter);
app.use("/",ResponderRouter);
app.use("/auth",authRoute);