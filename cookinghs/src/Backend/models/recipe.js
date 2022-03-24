const mongoose = require('mongoose')

const ingredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: Number,
    unit: String
})

const RecipeSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    parent: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    ingredients: [ingredientsSchema],
    steps: [{String}],
    course: String,
    cuisine: String,
    preptime: Number,
    cooktime: Number,
    servings: Number,
    image: String
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = { Recipe }