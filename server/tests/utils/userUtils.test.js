import UserUtils from '../../src/utils/userUtils.js'
import { EMPTY_STRING } from "../../src/constants/common.js";

describe('userUtils', () => {
  test('formatDate: successful date formatting', () => {
    expect(UserUtils.formatDate('2005-08-09T18:31:42')).toBe('09 Aug 2005')
  })
  test('formatDate: date is undefined, should return null', () => {
    expect(UserUtils.formatDate()).toBe(EMPTY_STRING)
  })
})
