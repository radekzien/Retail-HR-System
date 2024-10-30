const mongoose = require('mongoose')

const Schema = mongoose.Schema

const weeklySchema = new Schema({
    employeeFName: {
        type: String,
        required: true
    },
    employeeSName: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
   Hours: {
        type: Number,
        required: true
    },
    weekStart: {
        type: Date,
        required: true
    },
    weekEnd: {
        type: Date,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('weekly', weeklySchema)