const role = require('../models/rolesModel')
const { default: mongoose } = require('mongoose')

//Create new role
const createRole = async (req, res) => {
    const{roleName, hourlyPay} = req.body
    try {
        const newRole = await role.create({roleName, hourlyPay})
        res.status(200).json(newRole)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//Get all roles
const getRoles = async(req, res) => {
    const roles = await role.find({})

    res.status(200).json(roles)
}

//Get Single role
const getRole = async(req, res) => {
    const { id } = req.params
    const singleRole = await role.findById(id)

    if(!role){
        return res.status(404).json({error:'Role not found'})
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Role not found'})
    }
    res.status(200).json(singleRole)
}

//delete role
const deleteRole = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Role not found'})
    }
    const selectRole = await role.findOneAndDelete({_id: id})

    if(!role){
        return res.status(404).json({error:'Role not found'})
    }
    res.status(200).json(selectRole)
}


//export
module.exports = {
    createRole,
    getRoles,
    getRole,
    deleteRole
}