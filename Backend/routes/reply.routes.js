import express from 'express';
import { createReply } from '../controller/reply.controller.js';

const Router=express.Router();


Router.post('/create',createReply);

export default Router;