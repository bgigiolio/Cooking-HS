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

// Add models here vvv

// Add models here ^^^

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const port = process.env.PORT || 5000
app.listen(port, () => {
    log("Server listening on " + port)
}).on('error', (error) => {
    log("Express server connection error!")
    log(error)
})