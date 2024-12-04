const express=require('express');
const router=express.Router();
const {login,register}=require('../controllers/authController')
const { logout } = require('../controllers/authController'); // Ensure this path is correct



// Route to handle registration
router.get('/register', (req, res) => {
    res.render('register'); // Render the registration form view
});

router.post('/register', register); // Call the register controller

// Route to handle login
router.get('/login', (req, res) => {
    res.render('login'); // Render the login form view
});

router.post('/login', login); // Call the login controller
router.get('/logout', logout);

module.exports=router;
