const { default: mongoose } = require('mongoose')
const weekly = require('../models/weeklyModel')

//Create new Weekly
const createWeekly = async (req, res) => {
    const{employeeFName, employeeSName, Role, Hours, weekStart, weekEnd} = req.body
    try {
        const newWeekly = new weekly({employeeFName, employeeSName, Role, Hours, weekStart, weekEnd})
        const savedWeekly = await newWeekly.save()
        res.status(200).json(savedWeekly)
    }catch(error){
        res.status(400).json({error:error.mssg})
    }
    }

//Get all Weekly
const getAllWeekly = async(req, res) => {
    const weeklys = await weekly.find({})

    res.status(200).json(weeklys)
}

//Get Single Weekly
const getSingleWeekly = async(req, res) => {
    const { id } = req.params
    const singleWeekly = await weekly.findById(id)

    if(!weekly){
        return res.status(404).json({error:'Weekly Payroll not found'})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Weekly Payroll not found'})
    }
    res.status(200).json(singleWeekly)
}

//delete weekly
const deleteWeekly = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Weekly Payroll not found'})
    }
    const selectWeekly = await weekly.findOneAndDelete({_id: id})

    if(!weekly){
        return res.status(404).json({error:'Weekly Payroll not found'})
    }
    res.status(200).json(selectWeekly)
}

//updateWeekly
const updateWeekly = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.error('Invalid ObjectId:', id);
        return res.status(404).json({error: 'not found'})
    }
    const updatedPayslip = await weekly.findOneAndUpdate(
        { _id: id }, 
        { $set: req.body },  // Use $set to only update specified fields
        { new: true }        // Return the updated document
    );
}


//export
module.exports = {
    createWeekly,
    getAllWeekly,
    getSingleWeekly,
    deleteWeekly,
    updateWeekly
}