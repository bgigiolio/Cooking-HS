const log = console.log

const express = require('express')
const router = express.Router();

const { Comment } = require('../models/comment')

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

const { ObjectId } = require('mongodb');

router.get('/api/comments', mongoChecker, async (req, res) => {
    try {
        const comments = await Comment.find()
        res.send(comments)
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// post single comment
router.post('/api/comments', mongoChecker, async (req, res) => {
	const comment = new Comment({
		"recipeid": req.body.recipeid,
        "user": req.body.user,
        "rating": req.body.rating,
        "content": req.body.content
	})

	try {
		const result = await comment.save()
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

// get single comment - called by admin flags page if necessary
router.get('/api/comments/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    try {
		const comment = await Comment.findOne({_id: id})
		if (!comment) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			res.send(comment)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
    }
})

// delete an entire comment // not in use
router.delete('/api/comments/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
    }

    try {
		const comment = await Comment.findOneAndUpdate({_id: id}, {deleted: true})
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

// edit an entire comment // not in use
router.put('/api/comments/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
    }

    try {
		const comment = await Comment.findOneAndReplace({_id: id}, req.body, {new: true})
		if (!comment) {
			res.status(404).send()
		} else {   
			res.send(comment)
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
