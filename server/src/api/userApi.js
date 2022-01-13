import {
  APP_ID_FIELD,
  APP_ID_VALUE,
  CREATE_USER_URL,
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  USER_URL
} from "../constants/api.js";
import fetch from "node-fetch";

export default {
  getUsersData: (page, limit) => (
    fetch(`${USER_URL}?page=${page}&limit=${limit}`, {
      method: METHOD_GET,
      headers: {
        [APP_ID_FIELD]: APP_ID_VALUE,
      }
    }))
    .then(apiResponse => apiResponse.json()),

  getUserFullDataById: (id) => (
    fetch(`${USER_URL}/${id}`, {
    method: METHOD_GET,
    headers: {
      [APP_ID_FIELD]: APP_ID_VALUE,
    },
  }))
    .then(apiResponse => apiResponse.json()),

  createUser: (body) => (
    fetch(CREATE_USER_URL, {
      method: METHOD_POST,
      headers: {
        [APP_ID_FIELD]: APP_ID_VALUE,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body)
    }))
    .then(apiResponse => apiResponse.json()),

  updateUser: (id, data) => (
    fetch(`${USER_URL}/${id}`, {
      method: METHOD_PUT,
      headers: {
        [APP_ID_FIELD]: APP_ID_VALUE,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data)
    }))
      .then(apiResponse => apiResponse.json())
}
