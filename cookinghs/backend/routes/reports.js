const log = console.log

const express = require('express')
const router = express.Router();

const { Report } = require('../models/report')

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

const { ObjectId } = require('mongodb');

router.get('/api/reports', mongoChecker, async (req, res) => {
    try {
        const reports = await Report.find()
        res.send(reports)
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// post single report
router.post('/api/reports', mongoChecker, async (req, res) => {
	const report = new Report({
        "reporter_user": req.body.reporter_user,
        "reported_user": req.body.reported_user,
        "item": req.body.item,
        "item_type": req.body.item_type,
        "category": req.body.category,
        "context": req.body.context,
        "resolved": false,
        "resolved_by": ''
	})

	try {
		const result = await report.save()
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

// get single report - called by admin flags page if necessary
router.get('/api/reports/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    try {
		const report = await Report.findOne({_id: id})
		if (!report) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			res.send(report)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
    }
})

// delete an entire report // not in use
router.delete('/api/reports/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
    }

    try {
		const report = await Report.findOneAndUpdate({_id: id}, {resolved: true})
		if (!report) {
			res.status(404).send()
		} else {   
			res.send(report)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})

// edit an entire report // not in use
router.put('/api/reports/:id', mongoChecker, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
    }

    try {
		const report = await Report.findOneAndReplace({_id: id}, req.body, {new: true})
		if (!report) {
			res.status(404).send()
		} else {   
			res.send(report)
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
