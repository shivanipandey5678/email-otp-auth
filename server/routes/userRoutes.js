import express from 'express';
import Auth from '../middleware/Auth.js';
import { getUserData } from '../controllers/userController.js';
const userRouter =express.Router();

userRouter.get('/data',Auth,getUserData)

export default userRouter;