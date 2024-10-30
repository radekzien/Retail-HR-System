const express = require('express')
const router = express.Router()
const {
    createShift,
    getAllShifts,
    getSingleShift,
    deleteShift
} = require('../controllers/shiftController')

//GET ALL HOURS
router.get('/', getAllShifts)

//GET SINGLE HOURS
router.get('/:id', getSingleShift)

//POST SINGLE HOURS
router.post('/', createShift)

//DELETE SINGLE HOURS
router.delete('/:id', deleteShift)

//PATCH SINGLE HOURS
router.patch('/', (req, res) => {
    res.json({mssg: 'PATCH single HOURS'})
})


module.exports = router