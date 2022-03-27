const log = console.log

const express = require('express')
const cors = require('cors')
const router = express.Router();
router.use(cors)

const { Recipe } = require('../models/recipe')

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

const { ObjectID } = require('mongodb');

// get all recipes - called by recipe landing page
router.get('/api/recipes', mongoChecker, async (req, res) => {
	try {
        const recipes = await Recipe.find()
        res.send(recipes)
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// filtering route?? - filter by tags


// post single recipe - called by write page, fork page
router.post('/api/recipes', mongoChecker, async (req, res) => {
	const recipe = new Recipe({
        "author": req.body.author,
        "parent": req.body.parent,
        "title": req.body.title,
        "description": req.body.description,
        "ingredients": req.body.ingredients,
        "steps": req.body.steps,
        "course": req.body.course,
        "cuisine": req.body.cuisine,
        "preptime": req.body.preptime,
        "cooktime": req.body.cooktime,
        "servings": req.body.servings,
        "image": req.body.image
    })

    try {
        const result = await recipe.save()
        res.send(result)
    } catch(error) {
        log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
    }
})

// get single recipe - called by recipe single page
router.get('/api/recipes/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    try {
		const recipe = await Recipe.findOne({_id: id})
		if (!recipe) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			/// sometimes we might wrap returned object in another object:
			//res.send({student})   
			res.send(recipe)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
    }
})

// delete an entire recipe - called by delete recipe page
router.delete('/api/recipes/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
    }

    try {
		const recipe = await Recipe.findOneAndRemove({_id: id})
		if (!recipe) {
			res.status(404).send()
		} else {   
			res.send(recipe)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})

// edit an entire recipe - called by edit recipe page
router.put('/api/recipes/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
    }

    try {
		const recipe = await Recipe.findOneAndReplace({_id: id}, req.body, {new: true})
		if (!recipe) {
			res.status(404).send()
		} else {   
			res.send(recipe)
		}
	} catch (error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

module.exports = router
