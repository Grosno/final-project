const userService = {
  GET_USERS_LIST_INPUT_PARAMS: '[UserService.getUserList] URL PARAMS query={}',
  GET_USERS_LIST_SUCCESS: '[UserService.getUserList] success status={} response={}',
  GET_USERS_LIST_ERROR: '[UserService.getUserList] error status={} response={}',

  GET_USER_BY_ID_URL_PARAMS: '[UserService.getUserById] URL PARAMS params={}',
  GET_USER_BY_ID_SUCCESS: '[UserService.getUserById] success status={} response={}',
  GET_USER_BY_ID_ERROR: '[UserService.getUserById] error status={} response={}',

  CREATE_USER_INPUT_DATA: '[UserService.createUser] INPUT DATA body={}',
  CREATE_USER_SUCCESS: '[UserService.createUser] success status={} response={}',
  CREATE_USER_FAIL: '[UserService.createUser] fail status={} response={}',
  CREATE_USER_ERROR: '[UserService.createUser] error status={} response={}',

  UPDATE_USER_BY_ID_INPUT_DATA: '[UserService.updateUser] INPUT DATA id={} body={}',
  UPDATE_USER_BY_ID_SUCCESS: '[UserService.updateUser] success status={} response={}',
  UPDATE_USER_BY_ID_ERROR: '[UserService.updateUser] error status={} response={}',
}

export default userService;
