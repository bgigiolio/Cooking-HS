const log = console.log

const express = require('express')
const router = express.Router();

const { Recipe } = require('../models/recipe')

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

const { ObjectId } = require('mongodb');

{
	/*
	Query Parameters:
	1. course: (string), ideally a valid course type
	2. cuisine: (string), could be Italian, Asian etc [currently case sensitive, first letter caps!!]
	3. difficulty: (string), 2 comma separated numbers b/w 0 and 5 in the form: (lower limit, upper limit) INCLUSIVE
	4. cooktime: (string), 1 number representing minutes, returns all recipes that take less than this amount
	5. title [primarily for the search bar]: (string), returns all recipes with the corresponding string
	5. ingredients: (string), comma separated words, returns recipes that have ANY of the ingredients specified

	Note: The query itself has an "AND" relationship between all its parameters
	*/
}
router.get('/api/recipes', mongoChecker, async (req, res) => {
	try {
		let q = req.query;
		// console.log(q);

		// cuisine query 
		if(q.hasOwnProperty("cuisine")){
			// do something
			q["cuisine"] = {$regex: q.cuisine, $options: "i"}
		}

		// course query (entree, main, dessert etc)
		if(q.hasOwnProperty("course")){
			// do something
			q["course"] = {$regex: q.course, $options: "i"}
		}

		// difficulty query (0-5)
		if(q.hasOwnProperty("difficulty")){
			var diff = q["difficulty"].split(",")
			diff[0] = parseInt(diff[0]);
			diff[1] = parseInt(diff[1]);
			q["difficulty"] = {$gte: diff[0], $lte: diff[1]}
		}

		// cooktime query (in minutes)
		if(q.hasOwnProperty("cooktime")){
			var time = parseInt(q['cooktime']);
			console.log(time);
			q["cooktime"] = {$lte: time}
		}

		// recipe title query: used in the searchbar!!!
		if(q.hasOwnProperty("title")){
			// do something
			q["title"] = {$regex: q.title, $options: "i"}
		}

		// querying ingredients
		if(q.hasOwnProperty("ingredients")){
			// turn ingredients into a list
			var ings = q["ingredients"].split(",")
			var ingredient_querys = []
			for (let index = 0; index < ings.length; index++) {
				let ing_query = {
					name: {$regex: ings[index], $options: "i"}
				}
					
				ingredient_querys.push(ing_query)
			}

			// ingredients object with an or to query the ingredients list
			var final_ings = {
				$or: ingredient_querys
			}
			q["ingredients"] = { $elemMatch: final_ings }
		}
		
		// "get" the recipes
		var recipes = await Recipe.find(q).exec()

        res.send(recipes)
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

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

    if (!ObjectId.isValid(id)) {
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

    if (!ObjectId.isValid(id)) {
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

    if (!ObjectId.isValid(id)) {
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
