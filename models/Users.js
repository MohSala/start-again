const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema ({
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

    phone: {
        type: Number,
        required: true,
        default: 0
    },

    password: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = User = mongoose.model('users',UserSchema);