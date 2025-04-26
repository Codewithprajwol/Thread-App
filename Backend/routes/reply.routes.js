import express from 'express';
import { createReply, getReplies, likeUnlikeReply, } from '../controller/reply.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const Router=express.Router();


Router.post('/create',protectRoute,createReply);
Router.get('/getReplies/:postId',protectRoute,getReplies);
Router.post('/likeUnlike/:replyId',protectRoute,likeUnlikeReply);

export default Router;