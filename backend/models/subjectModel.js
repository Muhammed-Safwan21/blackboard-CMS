import mongoose from "mongoose";

const lessonSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    lessonProgress:[{
        readBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        isRead:{
            type:Boolean,
            required:true,
            default:false
        },
        readAt:{
            type:Date,
        },
    }]

},{timestamps:true})



const subjectSchema = new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    lessons:[lessonSchema],
    
},{timestamps:true})

const Subject =  mongoose.model("Subject",subjectSchema);
export default Subject ;