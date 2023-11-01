import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


// Protect routes
const protect = async (req, res, next) => {

  let token;

  // read the jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
        console.log(error)
      res.status(401);
      throw new Error("Not authorized ,token failed ");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
};

// teacher middleware
const teacher = (req, res, next) => {
    if (req.user && req.user.role === "teacher") {
      next();
    } else {
      res.status(403); // Forbidden
      throw new Error('Not authorized as a teacher');
    }
  };

  // student middleware
const student = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403); // Forbidden
    throw new Error('Not authorized as a teacher');
  }
};


// admin middleware
const admin = (req, res ,next)=>{
    if(req.user && req.user.role === 'admin'){
        next()
    }else{
        res.status(401)
        throw new Error('not authorized as admin')
    }
}

export {protect, teacher,student,admin}