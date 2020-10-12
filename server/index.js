const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
 
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(morgan("combined"));
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());

const port = process.env.PORT; //PORT from .env.(development/production).local

//Default route
app.get('/', (req,res) => {
    res.send("Hello World!");
});

// Get user data
const userRoute = require("./routes/user.js");
app.use("/user", userRoute);
// Get note data
const notesRoute = require("./routes/notes.js");
app.use("/notes", notesRoute);
// Register user
const registerRoute = require("./routes/register.js");
app.use("/register", registerRoute);
// Login user
const loginRoute = require("./routes/login.js");
app.use("/login", loginRoute);
// Logout user
const logoutRoute = require("./routes/logout.js");
app.use("/logout", logoutRoute);
// Close user account
const closeRoute = require("./routes/close.js");
app.use("/close", closeRoute);
// Create a new note
const createRoute = require("./routes/create.js");
app.use("/create", createRoute);
// Remove a note
const removeRoute = require("./routes/remove.js");
app.use("/remove", removeRoute);
// Save note to database
const saveRoute = require("./routes/save.js");
app.use("/save", saveRoute);

//Connecto to mongodb
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log("Connected to mongodb")); //DB url from .env.(development/production).local

//Listen to the port
app.listen(port, () => console.log(`Listening at ${port}`));