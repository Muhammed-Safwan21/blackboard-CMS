import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";


//login user and get token
const loginUser =asyncHandler( async(req,res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){

       generateToken(res , user._id)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        })
    }else{
        res.status(401);
        throw new Error("Invalid email or password ")
    }
})

// register user
const registerUser = asyncHandler(async(req,res)=>{

    const { name , email ,role, password} = req.body

    const existUser = await User.findOne({email})

    if(existUser){
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        role,
        password
    })
    if(user){
        generateToken(res , user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }

  
})


// Logout user
const logoutUser = asyncHandler(async(req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'logout sucessfully'})
})

// get user profile
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        })

    }else{
        res.status(404);
        throw new Error('User not found')
    }
})

// update user profile
const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.body._id)
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        if(req.body.password){
            user.password = req.body.password
        }

        const updateUser = await user.save() 

        res.status(200).json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            role:updateUser.role,
        })
        

    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

 // get user by id
const getUserByID = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user){
     res.status(200).json(user)
    }else{
     res.status(404);
     throw new Error('User not found')
    }
 })

 // delete user
 const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(user){
     if(user.role === 'admin'){
         res.status(400);
         throw new Error('Cannot delete admin user')
     }
     await User.deleteOne({_id:user._id});
     res.status(200).json({message:'User deleted successfully'})
    }else{
     res.status(404)
     throw new Error('User not found')
    }
 })
 
 // update user
 const updateUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
 
    if(user){
     user.name = req.body.name || user.name ;
     user.email = req.body.email || user.email;
     user.role = req.body.role
 
     const updatedUser = await user.save()
     res.status(200).json({
         _id:updatedUser._id ,
         name:updatedUser.name,
         email:updatedUser.email,
         role : updatedUser.role,
     })
    }else{
     res.status(404);
     throw new Error('User not found')
    }
     
 })

 // get all students
const getAllStudents = asyncHandler(async(req,res)=>{
    const users = await User.find({role:"student"});
    res.status(200).json(users)
 })

 //get all admins
const getAllAdmins = asyncHandler(async(req,res)=>{
    const users = await User.find({role:"admin"});
    res.status(200).json(users)
 })
 
 // get all teachers
const getAllTeachers = asyncHandler(async(req,res)=>{
    const users = await User.find({role:"teacher"});
    res.status(200).json(users)
 })
 
 export {
     loginUser,
     registerUser,
     logoutUser,
     getUserProfile,
     getUserByID,
     deleteUser,
     updateUser,
     updateUserProfile,
     getAllTeachers,
     getAllStudents,
     getAllAdmins
 }
 
 
 
 
 
