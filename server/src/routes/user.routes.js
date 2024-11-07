import { Router } from 'express';
import * as userCont from '../controllers/user.cont';

const userRouter = Router();

userRouter.get('/login', userCont.loginuser);
userRouter.get('/register', userCont.registeruser);

export default userRouter;