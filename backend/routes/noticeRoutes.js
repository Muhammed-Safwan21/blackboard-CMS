import express from 'express'
import { createNotice, deleteNotice, getAllNotices, updateNotice } from '../controllers/noticeController.js'
import {protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').get(getAllNotices).post(protect,createNotice)
router.route('/:id').put(protect,updateNotice).delete(deleteNotice)

export default router;