import UserRepository from '../repositories/userRepository.js'
import status from "../../constants/status.js";
import logFile from "../logger.js";
import { loggerMessages as msg } from "../constants/logger-messages/loggerMessages.js";
import format from 'string-format';
import PostRepository from "../repositories/postRepository.js";
import {defaultLimitValue} from "../constants/api.js";

class PostService {
  getPosts(req, res) {
    logFile.info(format(msg.postService.GET_POSTS_LIST_INPUT_PARAMS, JSON.stringify(req.query)));
    PostRepository.getPostsList(req.query.page, req.query.limit)
      .then(response => {
        const result = JSON.stringify(response);
        logFile.info(format(msg.postService.GET_POSTS_LIST_SUCCESS, status.OK, result))
        res.status(status.OK).send(result)
      })
      .catch(err => {
        logFile.error(msg.postService.GET_POSTS_LIST_ERROR, status.UNKNOWN_ERROR, err)
        res.status(status.UNKNOWN_ERROR)
          .json({
            status: status.UNKNOWN_ERROR,
            error: err.message,
          })
      })
  }
  getPostsByUser(req, res) {
    logFile.info(format(msg.postService.GET_POSTS_BY_USER_ID_URL_PARAMS, req.params.id, req.query.page, req.query.limit))
    PostRepository.getPostsByUserId(req.params.id, req.query.page, req.query.limit)
      .then(response => {
        const result = JSON.stringify(response);
        logFile.info(format(msg.postService.GET_POSTS_BY_USER_ID_SUCCESS, status.OK, result))
        res.status(status.OK).send(result)
      })
      .catch(error => {
        logFile.error(format(msg.postService.GET_POSTS_BY_USER_ID_ERROR, error))
        res.status(status.UNKNOWN_ERROR)
          .json({
            status: status.UNKNOWN_ERROR,
            error: error.message,
          })
      })
  }
}

export default new PostService();
