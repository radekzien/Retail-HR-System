const shift = require('../models/shiftModel')
const { default: mongoose } = require('mongoose')

//Create new shift
const createShift = async (req, res) => {
    const{employeeFName, employeeSName, Role, startTime, endTime, period} = req.body
    try {
        const newShift = await shift.create({employeeFName, employeeSName, Role, startTime, endTime, period})
        res.status(200).json(newShift)
    }catch(error){
        res.status(400).json({error:error.mssg})
    }
}

//Get all shifts
const getAllShifts = async(req, res) => {
    const allShifts = await shift.find({})

    res.status(200).json(allShifts)
}

//Get Single shift
const getSingleShift = async(req, res) => {
    const { id } = req.params
    const singleShift = await shift.findById(id)

    if(!shift){
        return res.status(404).json({error:'Shift not found'})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Shift not found'})
    }
    res.status(200).json(singleShift)
}

//delete hours
const deleteShift = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Shift not found'})
    }
    const selectShift = await shift.findOneAndDelete({_id: id})

    if(!selectShift){
        return res.status(404).json({error:'Shift not found'})
    }
    res.status(200).json(selectShift)
}


//export
module.exports = {
    createShift,
    getAllShifts,
    getSingleShift,
    deleteShift
}