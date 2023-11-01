import Notice from "../models/noticeModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';


// Create a new notice
const createNotice = asyncHandler(async(req,res)=>{
    const {title,description} = req.body;
    const createdBy = req.user._id;
    const createdAt = Date.now()
    const notice = new Notice({title,createdAt,description,createdBy})
    await notice.save()
    res.status(201).json(notice)
})


// Get all notices
const getAllNotices = asyncHandler(async(req,res)=>{
    const notices = await Notice.find()
    res.status(200).json(notices);

})

// Get a single notice by ID
const getNoticeById = asyncHandler(async(req,res)=>{
    const notice = await Notice.findById(req.params.id)
    if(notice){
        res.json(notice)
    }else{
        res.status(404)
        throw new Error("notice not found")
    }
})

// Update a notice by ID
const updateNotice = asyncHandler(async(req,res)=>{
    const notice = await Notice.findById(req.params.id)
    if(notice){
        notice.title = req.body.title;
        notice.createdAt = Date.now();
        notice.createdBy = req.user._id;
        notice.description = req.body.description;

        const updatedNotice = await notice.save();
        res.json(updatedNotice)
    }else{
        res.status(404)
        throw new Error("Notice not found")
    }
})

// Delete a notice by ID
const deleteNotice = asyncHandler(async(req,res)=>{
    const notice = await Notice.findByIdAndDelete(req.params.id)
    if(notice){
        res.status(200).json(notice)
    }else{
        res.status(404)
        throw new Error("Notice not found")
    }
})

export {createNotice,getAllNotices,getNoticeById,updateNotice,deleteNotice}
