import Router from "express";
import {PROXY_POST_BY_USER_ID_URL, PROXY_POST_URL} from "../constants/routes.js";
import PostService from "../services/postService.js";

const router = new Router();

router.get(PROXY_POST_URL, PostService.getPosts)
router.get(PROXY_POST_BY_USER_ID_URL, PostService.getPostsByUser)

export default router;
