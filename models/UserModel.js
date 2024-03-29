const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true

    },
    email: {
        type: String,
        trim: true,
        required: true

    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users',UserSchema)