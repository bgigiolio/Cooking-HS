'use strict'
const log = console.log
const path = require ('path')
require('dotenv').config()

const express = require('express')
const app = express();

const {mongoose} = require('./db/database')
const {ObjectID} = require('mongodb')
// mongoose.set('bufferCommands', false);
// ^^^ this has caused some problems for me in the past

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Add models here vvv

// Add models here ^^^

// Add routes here vvv
app.use(require('./routes/recipes'))


// Add routes here ^^^

// 404 route at the bottom for anything not found.
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