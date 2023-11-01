import express from 'express';
import { deleteUser, getAllStudents, getAllTeachers, getUserByID, loginUser, logoutUser, registerUser, updateUserProfile, updateUser, getAllAdmins } from '../controllers/userController.js'

const router = express.Router();

router.route('/').post(registerUser)
router.route('/teachers').get(getAllTeachers)
router.route('/students').get(getAllStudents)
router.route('/admins').get(getAllAdmins)
router.route('/profile').put(updateUserProfile) //own
router.route('/:id').delete(deleteUser).put(updateUser).get(getUserByID)
router.post('/login',loginUser)
router.post('/logout',logoutUser)

export default router