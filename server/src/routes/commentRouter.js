import { Router } from "express";
import CommentService from "../services/commentService.js";
import { PROXY_COMMENT_BY_POST_ID_URL } from "../constants/routes.js";

const router = new Router();

router.get(PROXY_COMMENT_BY_POST_ID_URL, CommentService.getCommentsByPost);

export default router;
