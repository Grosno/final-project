import {defaultLimitValue, defaultPageValue, maxLimitValue,} from "../constants/api.js";
import logFile from "../logger.js";
import format from "string-format";
import {loggerMessages as msg} from "../constants/logger-messages/loggerMessages.js";
import status from "../../constants/status.js";
import postApi from "../api/postApi.js";
import PostLimitUtils from "../utils/postLimitUtils.js";

class PostRepository {
  getPostsList(page = defaultPageValue, limit = defaultLimitValue) {
    logFile.info(format(msg.postRepository.GET_POSTS_LIST_SEARCH_PARAMS, page, limit))
    return postApi.getPosts(page, limit)
      .then(response => {
        logFile.info(format(msg.postRepository.GET_POSTS_LIST_SUCCESS, status.OK, JSON.stringify(response)))
        return response
      })
      .catch((error) => {
        logFile.error(format(msg.postRepository.GET_POSTS_LIST_ERROR, status.UNKNOWN_ERROR, error))
        return error
      })
  }
  getPostsByUserId(id, page = defaultPageValue, limit = defaultLimitValue) {
    logFile.info(format(msg.postRepository.GET_POSTS_BY_USER_ID_PARAMS, id, page, limit))
    return postApi.getPostsByUser(
      id,
      limit < defaultLimitValue ? defaultPageValue : page,
      limit < defaultLimitValue ? maxLimitValue : limit)
      .then(response => {
        if (limit < 5) return PostLimitUtils.postEditLimit(response, page, limit)
        else {
          logFile.info(format(msg.postRepository.GET_POSTS_BY_BY_USER_ID_SUCCESS, status.OK, response))
          return response
        }
      })
      .catch((error) => {
        logFile.error(format(msg.postRepository.GET_POSTS_BY_BY_USER_ID_ERROR, status.UNKNOWN_ERROR, error))
        return error
      })
  }
}

export default new PostRepository();
