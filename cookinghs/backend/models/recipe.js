const mongoose = require('mongoose')
const { imageSchema } = require('./image')

const IngredientsSchema = new mongoose.Schema({
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
    ingredients: [IngredientsSchema],
    steps: [String],
    course: String,
    cuisine: String,
    preptime: Number,
    cooktime: Number,
    servings: Number,
    difficulty: {type: Number, required: true},
    image: String,
    averageRating: Number,
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = { Recipe }