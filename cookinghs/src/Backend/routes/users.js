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
    if(!req.query.hasOwnProperty("username")){
        query.username = ""
    }
    if(!req.query.hasOwnProperty("passHash")){
        query.passHash = ""
    }
    console.log(req.query)
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

// In the query params, use something like this: 
//req.query ->
//{want: ["username", "etc", ...]}
//make sure you use the key 'want' with an array of everything you want
router.route("/session").get((req, res) => { //Use this to get session information
    const query = req.query.want
    if(!Array.isArray(query)){
        res.status(422).send("Please send an array of attributes you want")
    }
    const toSend = {}
    query.forEach(element => {
        if(req.session.hasOwnProperty(element)){
            toSend[element] = req.session[element]
        }
    });
    res.status(200).json(toSend)
})

router.route("/logout").get((req, res) => {
    console.log("reached logout")
    req.session.destroy((error) => {
        if(error){
            console.log("logout fail")
            res.status(500).send(error)
        }else{
            console.log("user logged out")
            res.status(200).send("User logged out")
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



router.route("/login/:id").get((req, res) => {
    User.findById(req.params.id, 
        (error, result) => {
            console.log(result)
            const user = result
            if(error){
                res.status(500).send("internal server error")
            }else{
                req.session._id = user._id.toString();
                req.session.admin = user.admin;
                req.session.username = user.username;
                req.session.fullName = user.fullName;
                req.session.email = user.email;
                req.session.recipes = user.recipes;
                req.session.liked = user.liked;
                req.session.bookmarked = user.bookmarked;
                req.session.skillLevel = user.skillLevel
                console.log(req.session)
                res.status(200).send("session updated!")
            }
        })
})


module.exports = router;


