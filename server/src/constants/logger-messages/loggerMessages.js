import userService from "./user/userService.js";
import userRepository from "./user/userRepository.js";
import postService from "./post/postService.js";
import postRepository from "./post/postRepository.js";
import commentRepository from "./comment/commentRepository.js";
import commentService from "./comment/commentService.js";
import postLimitUtils from "./utils/postLimitUtils.js";

export const loggerMessages = {
  userService,
  userRepository,
  postService,
  postRepository,
  commentService,
  commentRepository,
  postLimitUtils
}
