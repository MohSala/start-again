const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProfileSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    bmi: [
        {
            weight: {
                type: Number,
                trim: true,
                default: 0
            },
            height: {
                type: Number,
                trim: true,
                defualt: 0
            },
            value: {
                type: Number,
                default: 0
            },
            from: {
                type:Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type:Boolean,
                default: false
            },
            date: {
                type: Date,
                default: Date.now
            }
    }
],
    handle: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema);