import express from 'express';
import { createPost, deletePost,getAllPost, getPostById, likeUnlikePost } from '../controller/post.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();

router.post('/create',protectRoute,createPost);
router.get('/getAllPost',protectRoute,getAllPost);
router.post('/:id',protectRoute,getPostById);
router.delete('/:id',protectRoute,deletePost);
router.post('/like/:id',protectRoute,likeUnlikePost);


export default router;