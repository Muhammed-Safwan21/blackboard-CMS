import mongoose from "mongoose";


const resultSchema = new mongoose.Schema({
    
        attendedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        userAnswers: [
          {
            question: { type: String, required: true },
            userAnswer: { type: String, required: true },
          },
        ],
        mark: {
          type: Number,
          required: true,
          default: 0,
        },
      
},{timestamps:true})


const quizSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    questions:[
        {
            question:{type:String,required:true},
            options:[{type:String,required:true}],
            correctAnswer:{type:String,required:true},
            
        }
    ],
    result:[resultSchema]
    
})

const Quiz = mongoose.model("Quiz",quizSchema)
export default Quiz;
