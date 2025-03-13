import express from 'express'
import { createUser, loginUser, logoutUser } from '../controller/user.controller.js';

const router=express.Router();


router.post('/signup',createUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)

router.post('/verify-email',verifyEmail)

export default router;