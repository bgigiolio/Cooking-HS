const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    parent: {
        type: String,
        default: "",
    },
    deleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    ingredients: [{
        name: {type: String, required: true},
        quantity: Number,
        unit: String
    }],
    steps: [{
        step: {type: String, required: true},
        stepimage: String
    }],
    course: String,
    cuisine: String,
    preptime: Number,
    cooktime: Number,
    servings: Number,
    difficulty: {type: Number, required: true},
    image: String,
    averageRating: Number,
    // comments: [CommentSchema]
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = { Recipe }