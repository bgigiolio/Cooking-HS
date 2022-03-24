'use strict'
let log = console.log
let express = require("express")
const{mongoose} = require("mongoose")
var router = express.Router();
let app = express();

let user = require("../models/user.model")
app.use(express.urlencoded())
app.use(express.json())

router.route("/").get((req, res) => {
    user.find().lean.then(function (result) {
        if (result) {
            res.status(200).send(result)
        }
    })
})
