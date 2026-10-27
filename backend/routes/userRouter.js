const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

//Register
router.post('/register',userCtrl.registerUser)

//Login
router.post('/login',userCtrl.loginUser)

//verify Token
router.get('/verify',userCtrl.verifiedToken)


// Get user by ID
router.get('/:id', userCtrl.getUserById);


router.put('/update/:id', userCtrl.updateUser)

router.delete('/delete/:id', userCtrl.deleteUser);


module.exports=router