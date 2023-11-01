import Quiz from '../models/quizModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import mongoose from 'mongoose';


// Get list of all quizzes
const getAllQuizzes = asyncHandler(async (req, res) => {
  try {
    
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Get a single quiz by ID
const getQuizById = asyncHandler(async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new quiz
const createQuiz = asyncHandler(async (req, res) => {
  try {
    const { quizTitle, questions } = req.body;
    const createdBy = req.user._id;

    const quiz = new Quiz({ title:quizTitle, questions, createdBy });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Update a quiz by ID
const updateQuizById = asyncHandler(async (req, res) => {
  
    const { quizTitle, questions } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }
    quiz.title = quizTitle;
    quiz.questions = questions;
    const updatedQuiz =await quiz.save();
    console.log(updatedQuiz)
    res.status(200).json(updatedQuiz);

});


// Delete a quiz by ID
const deleteQuizById = asyncHandler(async (req, res) => {

  const quiz = await Quiz.findByIdAndDelete(req.params.id)
  if(quiz){
      res.status(200).json({message:"quiz deleted successfully", quiz})
  }else{
      res.status(404)
      throw new Error("quiz not found")
  }

})

// Update after quiz by ID with results
const updateQuizResult = asyncHandler(async (req, res) => {
 
    const {userAnswers} = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
      return;
    }

    let mark = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (userAnswers[i].userAnswer === quiz.questions[i].correctAnswer) {
        mark += 10; 
      }
    }
    quiz.result.push({
      attendedBy: req.user._id, 
      userAnswers: userAnswers,
      mark: mark,
    });

    const updatedQuiz = await quiz.save();
    res.status(200).json(updatedQuiz);
 
});

// get quiz result
const getResult = asyncHandler(async (req, res) => {
  const quizId = req.params.id;
  const userId = req.user._id;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  const recentResult = await Quiz.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(quizId),
      },
    },
    {
      $unwind: '$result',
    },
    {
      $match: {
        'result.attendedBy': new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: {
        'result.updatedAt': -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        title:1,
        questions:1,
        result:1
      },
    }
  ]);
  res.status(200).json(recentResult[0]);
});


// get quizzes by creator
const getQuizByCreator = asyncHandler(async(req,res)=>{
  const quiz = await Quiz.find({createdBy:req.params.id})
  if(quiz){
    res.status(200).json(quiz)
  }else{
    res.status(404)
    throw new Error("No quizzes found")
  }

})

// get quiz progress for a user
const getQuizProgress = asyncHandler(async(req,res)=>{
  
  const userId = new mongoose.Types.ObjectId(req.params.id);

    const result = await Quiz.aggregate([
      {
        $unwind: "$result",
      },
      {
        $match: {
          "result.attendedBy": userId,
        },
      },
      {
        $project: {
          title: 1, 
          result: 1,
        },
      },
    ]);
    if(!result){
      res.status(404).json({message:"no results found"})
    }
    res.status(200).json(result)

})

const quizHistoryByUser = asyncHandler(async(req,res)=>{
  const quizId = req.params.id;
  const userId = req.user._id;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  const result = await Quiz.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(quizId),
      },
    },
    {
      $unwind: '$result',
    },
    {
      $match: {
        'result.attendedBy': new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $project: {
         title:1,
         result:1
      },
    }
  ]);
  res.status(200).json(result);

})

export  {
  createQuiz,
  getQuizById,
  updateQuizById,
  deleteQuizById,
  getAllQuizzes,
  updateQuizResult,
  getResult,
  getQuizByCreator,
  getQuizProgress,
  quizHistoryByUser
};
