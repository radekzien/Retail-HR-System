const express = require('express')
const router = express.Router()
const{
    createRole,
    getRoles,
    getRole,
    deleteRole
} = require('../controllers/rolesController')

//GET ALL ROLES
router.get('/', getRoles)

//GET SINGLE ROLE
router.get('/:id', getRole)

//POST SINGLE ROLE
router.post('/', createRole)

//DELETE SINGLE ROLE
router.delete('/:id', deleteRole)

//PATCH SINGLE ROLE
router.patch('/', (req, res) => {
    res.json({mssg: 'PATCH single ROLE'})
})


module.exports = router