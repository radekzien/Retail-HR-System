const express = require('express')
const router = express.Router()
const {
    createWeekly,
    getAllWeekly,
    getSingleWeekly,
    deleteWeekly,
    updateWeekly
} = require('../controllers/weeklyController')

//GET ALL WEEKLY
router.get('/', getAllWeekly)

//GET SINGLE WEEKLY
router.get('/:id', getSingleWeekly)

//POST SINGLE WEEKLY
router.post('/', createWeekly)

//DELETE SINGLE WEEKLY
router.delete('/:id', deleteWeekly)

//PATCH SINGLE WEEKLY
router.patch('/:id', updateWeekly)


module.exports = router