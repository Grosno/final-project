import Router from "express";
import UserService from "../services/userService.js";
import { PROXY_CREATE_USER_URL, PROXY_USER_BY_ID_URL, PROXY_USER_URL } from "../constants/routes.js";

const router = new Router();

router.get(PROXY_USER_URL, UserService.getUsers)
router.get(PROXY_USER_BY_ID_URL, UserService.getUserById)
router.post(PROXY_CREATE_USER_URL, UserService.createUser)
router.put(PROXY_USER_BY_ID_URL, UserService.updateUser)

export default router;
