const authorizeRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "User role not found. Authorization denied." });
          }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:"You do not have permission to perform this action"})
        }
        next();

    }

};


module.exports=authorizeRoles;