const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rolesSchema = new Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    hourlyPay: {
        type: Number,
        required: true
    },
    AccessType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('role', rolesSchema)