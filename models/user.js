const mongoose = require('mongoose');

const Schema = mongoose.Schema

const user = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    admin:{
        type: Boolean,
        default: false
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
    recipes: [String], // Store recipe _ids here
    liked: [String],
    bookmarked: [String],
    skillLevel: {
        type: Number,
        default: 0
    },
    profilePic: {
        type: String,
        default: 'https://res.cloudinary.com/yongdk1/image/upload/v1649020580/cookinghs/defaultProfile_hfixae.png'
    }

})

const User = mongoose.model('User', user);

module.exports = User;