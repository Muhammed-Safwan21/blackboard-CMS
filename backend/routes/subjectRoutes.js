import express from 'express'
import { getAllSubjects, getOneSubject, createSubject, updateSubject, deleteSubject, getSubjectByCreator } from '../controllers/subjectController.js'
import {createLesson,updateLessonById,deleteLessonById,getAllLessons,getLessonById,updateLessonToBeRead} from '../controllers/lessonController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getAllSubjects).post(protect,createSubject)
router.route('/creator/:id').get(protect,getSubjectByCreator)
router.route('/:id').delete(deleteSubject).put(updateSubject)
router.route('/:subjectId').get(getOneSubject).post(protect,createLesson)
router.route('/:subjectId/lessons/:lessonId').get(getLessonById).put(updateLessonById).delete(deleteLessonById)
router.route('/:subjectId/lessons/:lessonId/read').put(protect,updateLessonToBeRead)

export default router