import postApi from "../../src/api/postApi.js";
import PostRepository from "../../src/repositories/postRepository.js";

jest.spyOn(postApi,'getPosts')
jest.spyOn(postApi,'getPostsByUser')

describe('PostRepository.getPosts', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return resolved with posts list', (done) => {
    const expected = {
      id: "111",
      image: "https://someimage.com",
      likes: 43,
      owner: {
        firstName: "Sara",
        id: "222",
        lastName: "Andersen",
        picture: "https://someimage2.com",
        title: "ms",
        publishDate: "2020-05-24T14:53:17.598Z"
      },
      publishDate: "2020-05-24T14:53:17.598Z",
      tags: ["animal", "dog", "golden retriever"],
      text: "some post's text"
    }
    postApi.getPosts.mockResolvedValue(JSON.stringify({
      data: [expected],
      total: 1,
      page: 0,
      limit: 1,
    }))
    PostRepository.getPostsList(0,1)
      .then(result => {
        expect(result).toEqual(JSON.stringify({
          data: [expected],
          total: 1,
          page: 0,
          limit: 1,
        }))
        done()
      })
  })

  test('should return rejected with api error', (done) => {
    const errorExpected = { error: 'some error' }
    postApi.getPosts.mockResolvedValue(errorExpected)
    PostRepository.getPostsList(0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })

  test('should return rejected with fetch error', (done) => {
    const errorExpected = { error: 'some fetch error' }
    postApi.getPosts.mockRejectedValue(errorExpected)
    PostRepository.getPostsList(0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })
})

describe('PostRepository.getUserFullData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return resolved with user data', (done) => {
    const expected = {
      data: [{
        id: "111",
        image: "https://someimage.com",
        likes: 43,
        owner: {
          firstName: "Sara",
          id: "222",
          lastName: "Andersen",
          picture: "https://someimage2.com",
          title: "ms",
          publishDate: "2020-05-24T14:53:17.598Z"
        },
        publishDate: "2020-05-24T14:53:17.598Z",
        tags: ["animal", "dog", "golden retriever"],
        text: "some post's text"
      }],
      total: 1,
      page: 0,
      limit: 1,
    }
    postApi.getPostsByUser.mockResolvedValue(expected)
    PostRepository.getPostsByUserId('111',0,1)
      .then(result => {
        expect(result).toEqual(expected)
        done()
      })
  })

  test('should return rejected with api error', (done) => {
    const errorExpected = { error: 'some error' }
    postApi.getPostsByUser.mockResolvedValue(errorExpected)
    PostRepository.getPostsByUserId('111',0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })

  test('should return rejected with fetch error', (done) => {
    const errorExpected = { error: 'some fetch error' }
    postApi.getPostsByUser.mockRejectedValue(errorExpected)
    PostRepository.getPostsByUserId('111',0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })
})
