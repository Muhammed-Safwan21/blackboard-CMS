import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Subject from "../models/subjectModel.js";


//  fetch all subject
const getAllSubjects = asyncHandler(async(req,res)=>{
    const subjects = await Subject.find({});
    res.json(subjects)
})

//  fetch a subject
const getOneSubject = asyncHandler(async(req,res)=>{
    const subject = await Subject.findById(req.params.subjectId)
    
    if(subject){
        res.json(subject)
    }else{
        res.status(404)
        throw new Error("Subject not found")
    }
})

//  create a subject
const createSubject = asyncHandler(async(req,res)=>{
    const {name, code, image,description } = req.body;
    const createdBy = req.user._id;
    const subject = new Subject({name, code, image,description,createdBy})
    await subject.save()
    res.status(201).json(subject)
})


// delete a subject
const deleteSubject = asyncHandler(async(req,res)=>{
    const subject = await Subject.findByIdAndDelete(req.params.id)
    if(subject){
        res.status(200).json(subject)
    }else{
        res.status(404)
        throw new Error("Subject not found")
    }
})



// update a subject
const updateSubject = asyncHandler(async(req,res)=>{
    const subject = await Subject.findById(req.params.id)
    if(subject){
        subject.name = req.body.name;
        subject.code = req.body.code;
        subject.image = req.body.image;
        subject.description = req.body.description;

        const updatedSubject = await subject.save();
        res.json(updatedSubject)
    }else{
        res.status(404)
        throw new Error("Subject not found")
    }
})

// get subjects by a creator
const getSubjectByCreator = asyncHandler(async (req, res) => { 
  const result = await Subject.aggregate([
    {
      $unwind: "$lessons", 
    },
    {
      $match: {
        "lessons.createdBy":  new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" }, 
        createdBy: { $first: "$createdBy" }, 
        lessons: { $push: "$lessons" },
      },
    },
  ]);
  res.status(200).json(result);
});



export {getAllSubjects, getOneSubject,createSubject,updateSubject,deleteSubject,getSubjectByCreator}