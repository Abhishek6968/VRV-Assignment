const jwt=require('jsonwebtoken');


const verifyToken=(req,res,next)=>{
    const token = req.cookies.token; // Extract token from cookies

    // let token;
    // let authHeader=req.headers.authorization || req.headers.Authorization;
    // if(authHeader && authHeader.startsWith("Bearer")){
    //     token=authHeader.split(" ")[1];
        
        try{
            const decode=jwt.verify(token,process.env.JWT_Secret);
            req.user=decode;
            console.log('The decoded user is: ',req.user);
            next();

        }
        catch(err){
            res.status(400).json({message:"Token not valid"})
        }

    // } else {
    //     return res
    //         .status(401)
    //         .json({message:"No token, authorization denied"});
    // }

}

module.exports=verifyToken;