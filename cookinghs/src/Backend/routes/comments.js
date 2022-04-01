const log = console.log

const express = require('express')
const router = express.Router();

const { Comment } = require('../models/comments')

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



// router.get('/api/comments:id', mongoChecker, async (req, res) => {

//     // "get" the recipes
//     const id = req.params.id

//     // Good practise: Validate id immediately.
//     if (!ObjectId.isValid(id)) {
//         res.status(404).send()  // if invalid id, definitely can't find resource, 404.
//         return;  // so that we don't run the rest of the handler.
//     }

//     // check mongoose connection established.
//     if (mongoose.connection.readyState != 1) {
//         log('Issue with mongoose connection')
//         res.status(500).send('Internal server error')
//         return;
//     }

// 	try {
//         const comment = await Comment.findById(id)
//         if (!comment) {
//             res.status(404).send('Resource not found')  // could not find this student
//         } else {
//             /// sometimes we might wrap returned object in another object:
//             //res.send({comment})   
//             res.send(comment)
//         }
//     } catch(error) {
//         log(error)
//         res.status(500).send('Internal Server Error')  // server error
//     }

// 	// 	var recipes = await Recipe.find(q).exec()

//     //     res.send(recipes)
//     // } catch(error) {
//     //     log(error)
//     //     res.status(500).send("Internal Server Error")
//     // }
// })




// post single comment - (TODO - don't know about this comment) called by write page, fork page
router.post('/api/comments', mongoChecker, async (req, res) => {

    // check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	// Create a new student using the Student mongoose model
	const comment = new Comment({
		recipeid: req.body.recipeid,
		user: req.body.user,
        rating: req.body.rating,
        content: req.body.content
	})

	// Save comment to the database
	// async-await version:
	try {
		const result = await comment.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}


	// const recipe = new Recipe({
    //     "author": req.body.author,
    //     "parent": req.body.parent,
    //     "title": req.body.title,
    //     "description": req.body.description,
    //     "ingredients": req.body.ingredients,
    //     "steps": req.body.steps,
    //     "course": req.body.course,
    //     "cuisine": req.body.cuisine,
    //     "preptime": req.body.preptime,
    //     "cooktime": req.body.cooktime,
    //     "servings": req.body.servings,
    //     "image": req.body.image,
	// 	"difficulty": req.body.difficulty
    // })

    // try {
    //     const result = await recipe.save()
    //     res.send(result)
    // } catch(error) {
    //     log(error)
    //     if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
	// 		res.status(500).send('Internal server error')
	// 	} else {
	// 		res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
	// 	}
    // }
})

// get single comment - called by comment single page
router.get('/api/comments/:id', mongoChecker, async (req, res) => { 
    //TODO need to defined for /api/comments/ since that what I define in comment-actions
    
    const id = req.params.id

    // Good practise: Validate id immediately.
    if (!ObjectId.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

	try {
        const comment = await Comment.findById(id)
        if (!comment) {
            res.status(404).send('Resource not found')  // could not find this student
        } else {
            /// sometimes we might wrap returned object in another object:
            //res.send({comment})   
            res.send(comment)
        }
    } catch(error) {
        log(error)
        res.status(500).send('Internal Server Error')  // server error
    }
})

// delete an entire comment - called by delete comment page
router.delete('/api/comment/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
    }

    try {
		const comment = await Comment.findOneAndRemove({_id: id})
		if (!comment) {
			res.status(404).send()
		} else {   
			res.send(comment)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})

// // edit an entire recipe - called by edit recipe page
// router.put('/api/recipes/:id', mongoChecker, async (req, res) => {
//     const id = req.params.id

//     if (!ObjectId.isValid(id)) {
//         res.status(404).send('Resource not found')
// 		return;  // so that we don't run the rest of the handler.
//     }

//     try {
// 		const recipe = await Recipe.findOneAndReplace({_id: id}, req.body, {new: true})
// 		if (!recipe) {
// 			res.status(404).send()
// 		} else {   
// 			res.send(recipe)
// 		}
// 	} catch (error) {
// 		log(error) // log server error to the console, not to the client.
// 		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
// 			res.status(500).send('Internal server error')
// 		} else {
// 			res.status(400).send('Bad Request') // bad request for changing the student.
// 		}
// 	}
// })

module.exports = router
