import fetch from "node-fetch";
import {APP_ID_FIELD, APP_ID_VALUE, METHOD_GET, POST_URL, USER_URL} from "../constants/api.js";

export default {
  getPosts: (page, limit) => (
    fetch(`${POST_URL}?page=${page}&limit=${limit}`, {
      method: METHOD_GET,
      headers: {
        [APP_ID_FIELD]: APP_ID_VALUE,
      },
    })
      .then(apiResponse => apiResponse.json())),

  getPostsByUser: (id, page, limit) => (
    fetch(`${USER_URL}/${id}/post?page=${page}&limit=${limit}`, {
      method: METHOD_GET,
      headers: {
        [APP_ID_FIELD]: APP_ID_VALUE,
      },
    })
      .then(apiResponse => apiResponse.json())
  )
}
