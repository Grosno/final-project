import commentApi from "../../src/api/commentApi.js";
import CommentRepository from "../../src/repositories/commentRepository.js";

jest.spyOn(commentApi,'getCommentsForPost')

describe('CommentRepository.getCommentsForPost', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return resolved with list of comments', (done) => {
    const expectedRes = {
      data: [{
        id: '222',
        message: 'some message',
        post: '111',
        publishDate: '2020-03-23T22:30:39.944Z',
        owner: {
          firstName: "Vetle",
          id: "60d0fe4f5311236168a109e3",
          lastName: "Aasland",
          picture: "https://randomuser.me/api/portraits/med/men/97.jpg",
          title: "mr",
        }
      }],
      limit: 1,
      page: 0,
      total: 1,
    }
    commentApi.getCommentsForPost.mockResolvedValue(expectedRes)
    CommentRepository.getCommentsByPostId('111',0,1)
      .then(result => {
        expect(result).toEqual(expectedRes)
        done()
      })
  })

  test('should return rejected with api error', (done) => {
    const errorExpected = { error: 'some error' }
    commentApi.getCommentsForPost.mockResolvedValue(errorExpected)
    CommentRepository.getCommentsByPostId('111',0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })

  test('should return rejected with fetch error', (done) => {
    const errorExpected = { error: 'some fetch error' }
    commentApi.getCommentsForPost.mockRejectedValue(errorExpected)
    CommentRepository.getCommentsByPostId('111',0,1)
      .then(error => {
        expect(error)
          .toEqual(errorExpected)
        done()
      })
  })
})
