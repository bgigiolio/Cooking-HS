'use strict'
const log = console.log
const path = require ('path')
require('dotenv').config()
const cors = require("cors")

const express = require('express')
const app = express();
const session = require('express-session')

const {mongoose} = require('./db/database')
const {ObjectID} = require('mongodb')
// mongoose.set('bufferCommands', false);
// ^^^ this has caused some problems for me in the past


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
// Add model routes here vvv
const userRouter = require("./routes/users")
app.use(session({
    secret: "idk lol",
    cookie: {
        expires: 86400000, //one day
        httpOnly: true
    },
    saveUninitialized: false,
    resave: false
}))
app.use("/api/users", userRouter) // Could change this to just /users
// Add model routes here ^^^

const port = process.env.PORT || 5000
app.listen(port, () => {
    log("Server listening on " + port)
}).on('error', (error) => {
    log("Express server connection error!")
    log(error)
})