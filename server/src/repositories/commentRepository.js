import {
  defaultLimitValue,
  defaultPageValue,
} from "../constants/api.js";
import logFile from "../logger.js";
import format from "string-format";
import { loggerMessages as msg } from "../constants/logger-messages/loggerMessages.js";
import status from "../../constants/status.js";
import commentApi from "../api/commentApi.js";

class CommentRepository {
  getCommentsByPostId(id, page = defaultPageValue, limit = defaultLimitValue) {
    logFile.info(format(msg.commentRepository.GET_COMMENTS_BY_POST_ID_PARAMS, id, page, limit))
    return commentApi.getCommentsForPost(id, page, limit)
      .then(response => {
        logFile.info(format(msg.commentRepository.GET_COMMENTS_BY_POST_ID_SUCCESS, status.OK, response))
        return response
      })
      .catch((error) => {
        logFile.error(format(msg.commentRepository.GET_COMMENTS_BY_POST_ID_ERROR, status.UNKNOWN_ERROR, error))
        return error
      })
  }
}

export default new CommentRepository();
