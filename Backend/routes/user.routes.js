import express from 'express'
import { createUser, forgetPassword, loginUser, logoutUser, resetPassword, verifyEmail } from '../controller/user.controller.js';

const router=express.Router();


router.post('/signup',createUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)

router.post('/verify-email',verifyEmail)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)

export default router;