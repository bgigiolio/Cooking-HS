const mongoose = require('mongoose')

const IngredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: Number,
    unit: String
})

const CommentSchema = new mongoose.Schema({
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
    ingredients: [IngredientsSchema],
    steps: [{String}],
    course: String,
    cuisine: String,
    preptime: Number,
    cooktime: Number,
    servings: Number,
    image: String,
    averageRating: Number,
    comments: [CommentSchema]
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = { Recipe }