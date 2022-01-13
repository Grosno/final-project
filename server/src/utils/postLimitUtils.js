import logFile from "../logger.js";
import format from "string-format";
import { loggerMessages as msg } from "../constants/logger-messages/loggerMessages.js";

class PostLimitUtils {
  postEditLimit(response, page, limit) {
    const allData = [];
    let returnedData = [];
    const paginationStart = Number(page === -1 ? 0 : page) * Number(limit);
    const paginationLimit = (Number(page === -1 ? 0 : page) * Number(limit)) + Number(limit);
    logFile.info(format(msg.postLimitUtils.RECEIVED_PARAMETERS, JSON.stringify(response), limit))

    if (response.data.length !== 0) {
      response.data.forEach(postData => {
        allData.push(postData)
      })
      logFile.info(format(msg.postLimitUtils.ALL_DATA, JSON.stringify(allData)))
    }
    returnedData = allData.slice(paginationStart, paginationLimit);
    logFile.info(format(msg.postLimitUtils.RETURNED_DATA, JSON.stringify(returnedData)));
    return {
      data: [
        ...returnedData
      ],
        total: response.total,
        page,
        limit
    }
  }
}

export default new PostLimitUtils();
