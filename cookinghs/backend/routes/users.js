'use strict'
let log = console.log
let express = require("express")
const{mongoose} = require("mongoose")
var router = express.Router();
let app = express();
// const session = require("express-session")
let User = require("../models/user")
app.use(express.urlencoded())
app.use(express.json())

/*
User route guide!!!

Each route will be called as follows:
http://localhost:5000/api/users<route>
*** will likely need to change on deployment ***
example for route #3:
http://localhost:5000/api/users/search

-Add user: route #1
-Find user with attributes exactly as sent: route #2
-Find user with partial name search: route #3
-Get session info: route #4
-Log out (destroy session): route #5
-Get user by ID: route #6
-Update user _id's info: route #7
-Remove user _id: route #8
-Log user _id in (create their session): route #9

*/

//Send an object in the body of the type:
//body ->
//{username: <username>, passHash: <passHash>, attribute: <value>, ...}
// ***MUST INCLUDE username AND passHash***
router.route("/").post((req, res) => {//#1
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

//Finds a user with an exact username and passHash (good for logging in)
//Send a query object of the type:
//query -> 
//{username: <username>, passHash: <passHash>, ...}
//***WONT DO ANYTHING WITHOUT PROPER username AND passHash***
router.route("/").get((req, res) => { //#2
    let query = req.query
    if(!req.query.hasOwnProperty("username")){
        query.username = ""
    }
    if(!req.query.hasOwnProperty("passHash")){
        query.passHash = ""
    }
    User.find(query).lean().then(function (result) {
        if (result) {
            res.status(200).send(result)
        }else{
            res.status(422).send("Malformed")
        }
    })
})


//Finds a user with a partial string in their username
//Send a query object of the type:
//query ->
//{username: <partial username>, attribute: <value>, ...}
//Will add better search for other attributes if needed!
router.route("/search").get((req, res) => { //#3
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

//returns requested session information
// In the query params, use something like this: 
//req.query ->
//{want: ["username", "etc", ...]}
//make sure you use the key 'want' with an array of everything you want
router.route("/session").get((req, res) => { //#4
    const query = req.query.want
    if(!Array.isArray(query)){
        res.status(422).send("Please send an array of attributes you want")
    }
    const toSend = {}
    let fail = false
    query.forEach(element => {
        if(req.session.hasOwnProperty(element)){
            toSend[element] = req.session[element]
        }else{
            fail = true
        }
    });
    if(fail){
        res.status(404).json(null)
    }else{
        res.status(200).json(toSend)
    }
})

//logs a user out, destroying their current session cookie
//nothing special here, just call this to kill the current session :)
router.route("/logout").get((req, res) => {//#5
    req.session.destroy((error) => {
        if(error){
            console.log("logout fail")
            res.status(500).send(error)
        }else{
            console.log("user logged out")
            console.log(req.session)
            res.status(200).send("User logged out")
        }
    })
})

//Gets a user by their id
//also very simple, just send the id in the URL :)
router.route("/:id").get((req, res) => {//#6
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

//updates specific parts of a user who has the same _id as the one passed it
//attributes we want to update will be sent in the query in the form:
//query ->
//{attribute: <new value>, attribute2: <new value 2>, ...}
router.route("/:id").patch((req, res) => {//#7
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

router.route("/recipes/:id/:recipeid").patch((req, res) => {//#7
    User.findById(req.params.id, 
        (error, result) => {
        if(error){
            res.status(500).send("internal server error")
        }else if(result === null){
            res.status(404).send("user not found")
        }else{
            result.recipes.push(req.params.recipeid)
            result.save().then(() => res.status(200).send(result))
            .catch((error) => res.status(500).send(error))
        }
    })
})

//deletes user with _id equal to the one passed
//Also very simple :)
router.route("/:id").delete((req, res) => {//#8
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

//log user with _id in.
//This will update the current session to hold the user's non sensitive info
//calling is simple, but must call route #4 to access this info in the frontend
router.route("/login/:id").get((req, res) => {//#9
    User.findById(req.params.id, 
        (error, result) => {
            const user = result
            if(error){
                res.status(500).send("internal server error")
            }else{
                console.log(user.recipes)
                req.session._id = user._id.toString();
                req.session.admin = user.admin;
                req.session.username = user.username;
                req.session.fullName = user.fullName;
                req.session.email = user.email;
                req.session.recipes = user.recipes;
                req.session.liked = user.liked;
                req.session.bookmarked = user.bookmarked;
                req.session.skillLevel = user.skillLevel;
                req.session.profilePic = user.profilePic;
                req.session.save()
                console.log(req.session)
                res.status(200).send("session updated!")
            }
        })
})


module.exports = router;


