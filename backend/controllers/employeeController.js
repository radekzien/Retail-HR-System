const employee = require('../models/employeesModel')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//Create new employee
const createEmployee = async (req, res) => {
    const{employeeFName, employeeSName, Role} = req.body
    try {
        const newEmployee = await employee.create({employeeFName, employeeSName, Role})
        res.status(200).json(newEmployee)
    }catch(error){
        res.status(400).json({error:error.mssg})
    }
}

//Get all employees
const getAllEmployees = async(req, res) => {
    const allEmployees = await employee.find({})


    res.status(200).json(allEmployees)
}

//Get Single employee
const getSingleEmployee = async(req, res) => {
    const { id } = req.params
    const singleEmployee = await employee.findById(id)

    if(!employee){
        return res.status(404).json({error:'Employee not found'})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Employee not found'})
    }
    res.status(200).json(singleEmployee)
}

//delete employee
const deleteEmployee = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Employee not found'})
    }
    const selectEmployee = await employee.findOneAndDelete({_id: id})

    if(!selectEmployee){
        return res.status(404).json({error:'Employee not found'})
    }
    res.status(200).json(selectEmployee)
}

//login employee
const loginUser = async (req, res) => {
    const { Email, Password, employeeFName, employeeSName, Role, AccessType} = req.body

    try{
        const user = await employee.login(Email, Password, employeeFName, employeeSName, Role, AccessType)

        //Creating JWT
        const token = createToken(user._id)

        res.status(200).json(token)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup employee
const signupUser = async (req, res) => {
    const { Email, Password, employeeFName, employeeSName, Role, AccessType} = req.body

    try{
        const user = await employee.signup(Email, Password, employeeFName, employeeSName, Role, AccessType)

        //Creating JWT
        const token = createToken(user._id)

        res.status(200).json(token)
    } catch (error) {
        res.status(400).json({error: error.message})
    }


    res.json({mssg: 'signup user'})
}


//export
module.exports = {
    createEmployee,
    getAllEmployees,
    getSingleEmployee,
    deleteEmployee,
    loginUser,
    signupUser
}