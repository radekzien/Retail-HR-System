const express = require('express')
const router = express.Router()
const {
    createEmployee,
    getAllEmployees,
    getSingleEmployee,
    deleteEmployee,
    loginUser,
    signupUser
} = require('../controllers/employeeController')

//GET ALL EMPLOYEES
router.get('/', getAllEmployees)

//GET SINGLE EMPLOYEE
router.get('/:id', getSingleEmployee)

//POST SINGLE EMPLOYEE
router.post('/', createEmployee)

//DELETE SINGLE EMPLOYEE
router.delete('/:id', deleteEmployee)

//PATCH SINGLE EMPLOYEE
router.patch('/', (req, res) => {
    res.json({mssg: 'PATCH single EMPLOYEE'})
})

//LOGIN
router.post('/login', () => {})

//SIGNUP
router.post('/signup', () => {})


module.exports = router