import express from 'express';
import { createPost, deletePost,feedPosts,getAllUserPost, getPostById, likeUnlikePost, replypost } from '../controller/post.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();

router.post('/create',protectRoute,createPost);
router.get('/getAllUserPost/:id',protectRoute,getAllUserPost);
router.post('/:id',protectRoute,getPostById);
router.delete('/:id',protectRoute,deletePost);
router.post('/like/:id',protectRoute,likeUnlikePost);
router.post('/replies/:id',protectRoute,replypost);
router.get('/feedposts',protectRoute,feedPosts);


export default router;