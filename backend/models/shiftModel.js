const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shiftSchema = new Schema({
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
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
   period: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d'
    }
},)

module.exports = mongoose.model('shift', shiftSchema)