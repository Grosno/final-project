import moment from "moment";
import { EMPTY_STRING } from "../constants/common.js";

class UserUtils {
  formatDate(dateISO) {
    if (!dateISO) return EMPTY_STRING
    return moment(dateISO).format('DD MMM YYYY')
  }
}

export default new UserUtils();
