import express from 'express'
import { protect} from '../middlewares/authMiddleware.js';
import {createQuiz, deleteQuizById, getAllQuizzes, getQuizByCreator, getQuizById, getQuizProgress, getResult, quizHistoryByUser, updateQuizById, updateQuizResult} from '../controllers/quizController.js'
const router = express.Router()

router.route('/').get(getAllQuizzes).post(protect,createQuiz)
router.route('/:id').get(getQuizById).delete(deleteQuizById).put(updateQuizById)
router.route('/:id/result').put(protect,updateQuizResult).get(protect,getResult)
router.route('/creator/:id').get(getQuizByCreator)
router.route('/:id/progress').get(getQuizProgress)
router.route('/:id/hostory').get(protect,quizHistoryByUser)


export default router