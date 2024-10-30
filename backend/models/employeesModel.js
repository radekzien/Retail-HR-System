const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
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
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    AccessType: {
        type: String,
        required: true
    }
})

//Static signup method

employeeSchema.statics.signup = async function(Email, Password, employeeFName, employeeSName, Role, AccessType) {
   
    //validation
    if(!Email || !Password || !employeeFName || !employeeSName || !Role || !AccessType){
        throw Error('All fields must be filled')
    }
   
    if(!validator.isEmail(Email)){
        throw Error('Email not valid')
    }

    if(!validator.isStrongPassword(Password)){
        throw Error('Password not strong enough')
    }
    
    const exists = await this.findOne({ Email })

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(Password, salt)

    const user = await this.create({ Email, Password: hash, employeeFName, employeeSName, Role, AccessType})

    return user
}

//Static Login Method
employeeSchema.statics.login = async function(Email, Password, employeeFName, employeeSName, Role, AccessType){
    //validation
    if(!Email || !Password || !employeeFName || !employeeSName || !Role || !AccessType){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ Email })

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(Password, user.Password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('employee', employeeSchema)