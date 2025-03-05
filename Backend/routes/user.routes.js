import express from 'express'
import { createUser } from '../controller/user.controller.js';

const router=express.Router();


router.get('/signup',createUser)

export default router;