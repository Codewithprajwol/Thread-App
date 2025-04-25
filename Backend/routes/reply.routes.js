import express from 'express';
import { createReply, getReplies, likeUnlikeReply, } from '../controller/reply.controller.js';

const Router=express.Router();


Router.post('/create',createReply);
Router.get('/getReplies/:postId',getReplies);
Router.get('/likeUnlike/:replyId',likeUnlikeReply);

export default Router;