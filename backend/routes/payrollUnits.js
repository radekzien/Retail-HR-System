const express = require('express')
const router = express.Router()
const {
    getUnit,
    getUnits,
    createUnit,
    deleteUnit
} = require('../controllers/unitsController')

//GET ALL UNITS
router.get('/', getUnits)

//GET SINGLE UNIT
router.get('/:id', getUnit)

//POST SINGLE UNIT
router.post('/', createUnit)

//DELETE SINGLE UNIT
router.delete('/:id',deleteUnit)

//PATCH SINGLE UNIT
router.patch('/', (req, res) => {
    res.json({mssg: 'PATCH single unit'})
})


module.exports = router