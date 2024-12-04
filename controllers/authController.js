const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const register=async(req,res)=>{
    try{
    const {username, password, role}=req.body;
    // Hash the password
    const saltRounds = 10;  
    const hashedPassword = await bcrypt.hash(password, saltRounds);    
    const newUser=new User({username,password:hashedPassword,role});
    await newUser.save();
    res.render('registerSuccess', { message: `User registered with username ${username}` });

    }catch(err){
        res.status(400).json({message:err.message})
    }


};  
// const register = async (req, res) => {
//     try {
//         const { username, password, role } = req.body;

//         // Ensure all fields are present
//         if (!username || !password || !role) {
//             return res.status(400).json({ message: "Please provide all fields (username, password, role)" });
//         }

//         // Hash the password with salt rounds
//         const saltRounds = 10;  // Define the number of salt rounds for bcrypt
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         // Create a new user and save to the database
//         const newUser = new User({ username, password: hashedPassword, role });
//         await newUser.save();

//         // Render success page or return success message
//         res.render('registerSuccess', { message: `User registered with username ${username}` });

//     } catch (err) {
//         // Return error message if something goes wrong
//         res.status(400).json({ message: err.message });
//     }
// };

const login=async(req,res)=>{
    try{
        const {username, password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.render('error', { message: `User not found with username: ${username}` });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.render('error', { message: 'Invalid credentials' });
        }
        const token=jwt.sign({id:user._id,role:user.role},
            process.env.JWT_Secret,
            {expiresIn: "1h"}
            );
        res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 1000, // 1 hour
            });
        if (user.role === 'admin') {
            res.redirect('/api/users/viewAllUsers'); 
        } else if (user.role === 'manager') {
            res.redirect('/api/users/viewUsers'); 
        } else if (user.role === 'user') {
            res.render('userLogin', {
            username: user.username,
            role: user.role,
            id: user._id,
                });            } 
        else {
            return res.status(400).json({ message: 'Invalid user role' });
        }

}  catch(err){
    res.status(500).json({message:err.message})
}  };
const logout = (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true });
        res.render('logout', { message: 'You have successfully logged out!' });
    } catch (err) {
        res.status(500).json({ message: 'Logout failed', error: err.message });
    }
};


module.exports={register,login,logout};