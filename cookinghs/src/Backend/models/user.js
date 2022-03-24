const mongoose = require('mongoose');

const Schema = mongoose.Schema

const user = new Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    passHash: {
        type: String,
        required: true
    },
    recipes: [{String}], // Store recipe _ids here
    liked: [{String}],
    bookmarked: [{String}],
    skillLevel: {
        type: Number,
        default: 0
    }


})

const User = mongoose.model('User', userSchema);

module.exports = User;