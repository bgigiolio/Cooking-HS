'use strict'
let log = console.log
let express = require("express")
const{mongoose} = require("mongoose")
var router = express.Router();
let app = express();

let User = require("../models/user")
app.use(express.urlencoded())
app.use(express.json())

router.route("/").post((req, res) => {
    let userDetails = req.body

    if (!userDetails.hasOwnProperty("username")){
        res.status(422).send("Malformed: username required")
        return;
    }
    if (!userDetails.hasOwnProperty("passHash")){
        res.status(422).send("Malformed: passHash required")
        return;
    }
    const newUser = new User(userDetails);

    newUser.save().then(() => res.status(200).send("User created successfully!"))
    .catch((error) => res.status(400).send(error))

})

router.route("/").get((req, res) => { //fields must match exactly
    let query = req.query
    User.find(query).lean().then(function (result) {
        if (result) {
            res.status(200).send(result)
        }else{
            res.status(422).send("Malformed")
        }
    })
})

router.route("/search").get((req, res) => { //works for search bar (partial searches)
    let query = req.query
    if (query.hasOwnProperty("username")) {
        query["username"] = { $regex: query.username, $options: "i" };
    }
    User.find(query).lean().then(function (result) {
        if (result) {
            res.status(200).send(result)
        }else{
            res.status(422).send("Malformed")
        }
    })
})

router.route("/:id").get((req, res) => {
    User.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).send("internal server error")
        }else if(result === null){
            res.status(404).send("user not found")
        }else{
            res.status(200).send(result)
        }
    })
})

router.route("/:id").patch((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.query, {new: true}, 
        (error, result) => {
        if(error){
            res.status(500).send("internal server error")
        }else if(result === null){
            res.status(404).send("user not found")
        }else{
            res.status(200).send(result)
        }
    })
})

router.route("/:id").delete((req, res) => {
    User.findByIdAndDelete(req.params.id, 
        (error, result) => {
        if(error){
            res.status(500).send("internal server error")
        }else if(result === null){
            res.status(404).send("user not found")
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports = router;


