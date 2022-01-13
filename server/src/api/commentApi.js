import fetch from "node-fetch";
import { APP_ID_FIELD, APP_ID_VALUE, METHOD_GET, POST_URL } from "../constants/api.js";

export default {
  getCommentsForPost: (id, page, limit) => (
    fetch(`${POST_URL}/${id}/comment?page=${page}&limit=${limit}`, {
      method: METHOD_GET,
      headers: {
        [APP_ID_FIELD]: APP_ID_VALUE,
      },
    })
      .then(apiResponse => apiResponse.json()))
}
