const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    recipeid: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = { Comment }