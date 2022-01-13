import {
  defaultLimitValue,
  defaultPageValue,
  USER_URL
} from "../constants/api.js";
import logFile from "../logger.js";
import format from "string-format";
import { loggerMessages as msg } from "../constants/logger-messages/loggerMessages.js";
import UserMapper from "../mappers/userMapper.js";
import status from "../../constants/status.js";
import userApi from "../api/userApi.js";

class UserRepository {
  getUsersList(page = defaultPageValue, limit = defaultLimitValue) {
    logFile.info(format(msg.userRepository.GET_USERS_LIST_SEARCH_PARAMS, page, limit))
    return userApi.getUsersData(page, limit)
      .then(response => {
        logFile.info(format(msg.userRepository.GET_USERS_LIST_SUCCESS, status.OK, JSON.stringify(response)))
        return response
      })
      .catch((error) => {
        logFile.error(format(msg.userRepository.GET_USERS_LIST_ERROR, status.UNKNOWN_ERROR, error))
        return error
      })
  }

  getUserFullData(id) {
    logFile.info(format(msg.userRepository.GET_USER_FULL_DATA_INVOKE, `${USER_URL}/${id}`))
    return userApi.getUserFullDataById(id)
        .then(response => {
          logFile.info(format(msg.userRepository.GET_USER_FULL_DATA_SUCCESS, status.OK, JSON.stringify(response)))
          if (JSON.stringify(response).includes('error')) return response
          const formattedResponse = UserMapper.formatUserData(response)
          logFile.info(format(msg.userRepository.GET_USER_FULL_DATA_MAPPER_REPLY_RESULT, JSON.stringify(formattedResponse)))
          return formattedResponse
        })
        .catch((error) => {
          logFile.error(format(msg.userRepository.GET_USER_FULL_DATA_ERROR, status.UNKNOWN_ERROR, error))
          return error
        })
  }

  createNewUser(body) {
    logFile.info(format(msg.userRepository.CREATE_USER_INPUT_DATA, JSON.stringify(body)))
    return userApi.createUser(body)
      .then(response => {
        logFile.info(format(msg.userRepository.CREATE_USER_SUCCESS, status.OK, JSON.stringify(response)))
        return response
      })
      .catch((error) => {
        logFile.error(format(msg.userRepository.CREATE_USER_ERROR, status.UNKNOWN_ERROR, error))
        return error
      })
  }

  updateUserData(id, body) {
    logFile.info(format(msg.userRepository.UPDATE_USER_BY_ID_INPUT_DATA, id, JSON.stringify(body)))
    return userApi.updateUser(id, body)
      .then(response => {
        logFile.info(format(msg.userRepository.UPDATE_USER_BY_ID_SUCCESS, status.OK, JSON.stringify(response)))
        if (JSON.stringify(response).includes('error')) return response
        const formattedResponse = UserMapper.formatUserData(response)
        logFile.info(format(msg.userRepository.UPDATE_USER_BY_ID_MAPPER_REPLY_RESULT, JSON.stringify(formattedResponse)))
        return formattedResponse
      })
      .catch((error) => {
        logFile.error(format(msg.userRepository.UPDATE_USER_BY_ID_ERROR, status.UNKNOWN_ERROR, error))
        return error
      })
  }
}

export default new UserRepository();
