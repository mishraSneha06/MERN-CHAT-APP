import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute= async (req, res, next) =>{
    try {
        console.log("Cookie received : " ,req.cookies);
        const token= req.cookies.jwt; 

        if(!token){
            return res.status(401).json({message: "Not authorized - No Token Provided"});
        
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET); //verify token
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Not authorized - Invalid Token"});
        }
        console.log("Decoded token : ",decoded);

        const user= await User.findById(decoded.userId).select("-password");
        console.log("User found : ",user);

        if(!user){
            return res.status(401).json({message: "User not found"});
        }

        req.user=user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware : ",error.message);
        res.status(500).json({message: "Internal server error"});
    }
}