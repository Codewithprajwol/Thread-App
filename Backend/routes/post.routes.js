import express from 'express';
import { createPost, deletePost,getAllPost, getPostById } from '../controller/post.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import Post from '../model/post.model.js';

const router=express.Router();

router.post('/create',protectRoute,createPost);
router.get('/getAllPost',protectRoute,getAllPost);
router.post('/:id',protectRoute,getPostById);
router.delete('/:id',protectRoute,deletePost);


export default router;