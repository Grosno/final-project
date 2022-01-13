import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import commentRouter from "./commentRouter.js";

const router = new Router();
router.use('', userRouter);
router.use('', postRouter);
router.use('', commentRouter);

export default router;
