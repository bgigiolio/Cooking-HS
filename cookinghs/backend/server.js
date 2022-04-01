'use strict'
const log = console.log
const path = require ('path')
require('dotenv').config()
const cors = require("cors")
const express = require('express')
const app = express();
const session = require('express-session')
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: "idk lol",
    cookie: {
        expires: 86400000, //one day
        httpOnly: true,
        secure: false
    },
    saveUninitialized: false,
    resave: false
}))

const {mongoose} = require('./db/database')
const {ObjectID} = require('mongodb')
const {Recipe} = require('./models/recipe')
// mongoose.set('bufferCommands', false);
// ^^^ this has caused some problems for me in the past



const bodyParser = require('body-parser')
app.use(bodyParser.json())
// Add model routes here vvv
const userRouter = require("./routes/users")
app.use("/api/users", userRouter) // Could change this to just /users

app.use(require('./routes/recipes'))

app.use(require('./routes/comments'))
// Add model routes here ^^^

// // 404 route at the bottom for anything not found.
app.get('*', (req, res) => {
    res.status(404).send("404 Error: We cannot find the page you are looking for.");
    // you could also send back a fancy 404 webpage here.
});


const port = process.env.PORT || 5000
app.listen(port, () => {
    log("Server listening on " + port)
}).on('error', (error) => {
    log("Express server connection error!")
    log(error)
})