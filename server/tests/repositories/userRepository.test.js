import userApi from "../../src/api/userApi.js";
import UserRepository from "../../src/repositories/userRepository.js";
import userMapper from "../../src/mappers/userMapper.js";

jest.spyOn(userApi, 'getUsersData')
jest.spyOn(userApi, 'getUserFullDataById')
jest.spyOn(userApi, 'createUser')
jest.spyOn(userApi, 'updateUser')

jest.spyOn(userMapper, 'formatUserData')

describe('UserRepository.getUsersList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return resolved with users list', (done) => {
    userApi.getUsersData.mockResolvedValue(JSON.stringify({
      data: [{
        id: '111',
        title: 'ms.',
        firstName: 'Elena',
        lastName: 'Mendez',
        picture: 'https://some-pic.ru',
        gender: 'female',
        email: 'any@mail.ru',
        dateOfBirth: '2000-08-09T18:31:42',
        phone: '222',
        registerDate: '2015-09-12T19:01:22',
      }],
      total: 1,
      page: 0,
      limit: 1,
    }))
    UserRepository.getUsersList(0,1)
      .then(result => {
        expect(result).toEqual(JSON.stringify({
          data: [{
            id: '111',
            title: 'ms.',
            firstName: 'Elena',
            lastName: 'Mendez',
            picture: 'https://some-pic.ru',
            gender: 'female',
            email: 'any@mail.ru',
            dateOfBirth: '2000-08-09T18:31:42',
            phone: '222',
            registerDate: '2015-09-12T19:01:22',
          }],
          total: 1,
          page: 0,
          limit: 1,
        }))
        done()
      })
  })

  test('should return rejected with api error', (done) => {
    const errorExpected = { error: 'some error' }
    userApi.getUsersData.mockResolvedValue(errorExpected)
    UserRepository.getUsersList(0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })

  test('should return rejected with fetch error', (done) => {
    const errorExpected = { error: 'some fetch error' }
    userApi.getUsersData.mockRejectedValue(errorExpected)
    UserRepository.getUsersList(0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })
})

describe('UserRepository.getUserFullData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return resolved with user data', (done) => {
    userApi.getUserFullDataById.mockResolvedValue(JSON.stringify({
      id: '111',
      title: 'ms',
      firstName: 'Alena',
      lastName: 'Apina',
      gender: 'female',
      email: 'ok@nope.com',
      dateOfBirth: '2000-08-09T18:31:42',
      registerDate: '2015-09-12T19:01:22',
      phone: '222',
      picture: 'https://ok.ru',
      location: {
        street: 'baker',
        city: 'London',
        state: '',
        country: 'England',
        timezone: '+4',
      },
    }))
    const expectedRes = {
      id: '111',
      title: 'ms',
      firstName: 'Alena',
      lastName: 'Apina',
      gender: 'female',
      email: 'ok@nope.com',
      dateOfBirth: '09 Aug 2000',
      registerDate: '12 Sep 2015',
      phone: '222',
      picture: 'https://ok.ru',
    }
    userMapper.formatUserData.mockResolvedValue(expectedRes)
    UserRepository.getUserFullData('111')
      .then(result => {
        expect(result).toEqual(expectedRes)
        done()
      })
  })

  test('should return rejected with api error', (done) => {
    const errorExpected = { error: 'some error' }
    userApi.getUserFullDataById.mockResolvedValue(errorExpected)
    UserRepository.getUserFullData('111')
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })

  test('should return rejected with fetch error', (done) => {
    const errorExpected = { error: 'some fetch error' }
    userApi.getUserFullDataById.mockRejectedValue(errorExpected)
    UserRepository.getUserFullData('111')
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })
})

describe('UserRepository.createUser', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return resolved with created user data', (done) => {
    const resultExpected = {
      "id": "111",
      "firstName":"SomeFirstName",
      "lastName":"SomeLastName",
      "gender":"male",
      "email":"some@email.ru",
      "dateOfBirth":"2000-02-02T11:05:18.106Z",
      "phone":"0978098",
      "registerDate":"2021-12-18T11:05:29.405Z",
      "updatedDate":"2021-12-18T11:05:29.405Z"
    }
    userApi.createUser.mockResolvedValue(JSON.stringify(resultExpected))
    UserRepository.createNewUser({
      firstName:"SomeFirstName",
      lastName:"SomeLastName",
      gender:"male",
      email:"some@email.ru",
      dateOfBirth:"2000-02-02T11:05:18.106Z",
      phone:"0978098",
    })
      .then(result => {
        expect(result).toEqual(JSON.stringify(resultExpected))
        done()
      })
  })

  test('should return rejected with api error', (done) => {
    const errorExpected = { error: 'some error' }
    userApi.createUser.mockResolvedValue(errorExpected)
    UserRepository.createNewUser({})
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })

  test('should return rejected with fetch error', (done) => {
    const errorExpected = { error: 'some fetch error' }
    userApi.createUser.mockRejectedValue(errorExpected)
    UserRepository.createNewUser({})
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })
})

describe('UserRepository.updateUser', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return resolved with updated user data', (done) => {
    const resultExpected = {
      "id": "111",
      "firstName":"SomeFirstName",
      "lastName":"SomeLastName",
      "gender":"male",
      "email":"some@email.ru",
      "dateOfBirth":"02 Feb 2000",
      "phone":"0978098",
      "registerDate":"18 Dec 2021"
    }
    userApi.updateUser.mockResolvedValue(JSON.stringify({
      "id": "111",
      "firstName":"SomeFirstName",
      "lastName":"SomeLastName",
      "gender":"male",
      "email":"some@email.ru",
      "dateOfBirth":"2000-02-02T11:05:18.106Z",
      "phone":"0978098",
      "registerDate":"2021-12-18T11:05:29.405Z",
      "updatedDate":"2021-12-18T11:05:29.405Z"
    }))
    userMapper.formatUserData.mockResolvedValue(resultExpected)
    UserRepository.updateUserData('111',{ phone:"0978098" })
      .then(result => {
        expect(result).toEqual(resultExpected)
        done()
      })
  })

  test('should return rejected with api error', (done) => {
    const errorExpected = { error: 'some error' }
    userApi.updateUser.mockResolvedValue(errorExpected)
    UserRepository.updateUserData('111',{ phone:"0978098" })
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })

  test('should return rejected with fetch error', (done) => {
    const errorExpected = { error: 'some fetch error' }
    userApi.updateUser.mockRejectedValue(errorExpected)
    UserRepository.updateUserData('111',{ phone:"0978098" })
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })
})
