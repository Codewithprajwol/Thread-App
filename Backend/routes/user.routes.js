import express from 'express'
import { createUser, forgetPassword,validateUser, loginUser, logoutUser, resetPassword, verifyEmail } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();


router.post('/signup',createUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)

router.post('/verify-email',verifyEmail)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)

router.post('/checkauth',protectRoute, validateUser)
export default router;