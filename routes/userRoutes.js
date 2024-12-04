const express=require('express');
const app=express();
const verifyToken=require("../middleware/authMiddleware")
const authorizeRoles=require('../middleware/roleMiddleware');
const router=express.Router();
app.use(express.json());

router.get('/admin',verifyToken,authorizeRoles("admin"), (req,res)=>{
    res.json({message:'Welcome Admin'})
});
router.get('/manager',verifyToken,authorizeRoles("admin","manager"),(req,res)=>{
    res.json({message:'Welcome Manager'})
});
router.get('/user',verifyToken,authorizeRoles("admin","manager","user"),(req,res)=>{
    res.json({ message: 'Welcome User' });

});
const User = require('../models/userModel');

router.get('/viewAllUsers', verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.render('adminView', { users }); // Pass users data to the EJS template
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Manager-specific route
router.get('/viewUsers', verifyToken, authorizeRoles("admin", "manager"), async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }); // Fetch only users
        res.render('managerView', { users }); // Pass users data to the EJS template
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User-specific route
router.get('/profile', verifyToken, authorizeRoles('admin', 'manager', 'user'), (req, res) => {
    res.json({ message: "Welcome User", username: req.user.username });
});
module.exports=router;