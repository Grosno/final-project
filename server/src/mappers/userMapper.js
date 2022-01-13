import UserUtils from "../utils/userUtils.js";
import { EMPTY_OBJECT, EMPTY_STRING } from "../constants/common.js";

class UserMapper {
  formatUserData(userData) {
    if (!userData) return null
    if (Object.keys(userData).length === 0) return EMPTY_OBJECT
    return {
      id: userData.id,
      title: userData.title || EMPTY_STRING,
      firstName: userData.firstName,
      lastName: userData.lastName,
      picture: userData.picture,
      gender: userData.gender,
      email: userData.email,
      dateOfBirth: UserUtils.formatDate(userData.dateOfBirth),
      phone: userData.phone,
      registerDate: UserUtils.formatDate(userData.registerDate),
    }
  }
}

export default new UserMapper();
