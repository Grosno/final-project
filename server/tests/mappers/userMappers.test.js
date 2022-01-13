import UserMapper from '../../src/mappers/userMapper';
import { EMPTY_OBJECT } from "../../src/constants/common.js";

describe('userMapper', () => {
  test('formatUserData: should return object with formatted ISO date', () => {
    const input = {
      id: 'userData.id',
      title: 'userData.title',
      firstName: 'userData.firstName',
      lastName: 'userData.lastName',
      picture: 'userData.picture',
      gender: 'userData.gender',
      email: 'userData.email',
      dateOfBirth: '2005-08-09T18:31:42',
      phone: 'userData.phone',
      registerDate: '2015-09-12T19:01:22',
    }
    const expected = {
      id: 'userData.id',
      title: 'userData.title',
      firstName: 'userData.firstName',
      lastName: 'userData.lastName',
      picture: 'userData.picture',
      gender: 'userData.gender',
      email: 'userData.email',
      dateOfBirth: '09 Aug 2005',
      phone: 'userData.phone',
      registerDate: '12 Sep 2015',
    }
    expect(UserMapper.formatUserData(input)).toEqual(expected)
  })
  test('formatUserFullData: data is undefined, should return null', () => {
    expect(UserMapper.formatUserData()).toBeNull()
  })
  test('formatUserFullData: data is empty, should return empty object', () => {
    expect(UserMapper.formatUserData({})).toEqual(EMPTY_OBJECT)
  })
})
