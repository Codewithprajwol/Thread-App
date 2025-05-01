import express from 'express'
import { getConversation, getMessages, sendMessage } from '../controller/message.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const Router=express.Router();

Router.post('/',protectRoute, sendMessage);
Router.get('/getMessage/:otherUserId',protectRoute,getMessages);
Router.get('/conversation',protectRoute,getConversation);

export default Router;