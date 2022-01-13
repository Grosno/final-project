import commentApi from "../../src/api/commentApi.js";

describe('commentApi', () => {
  const expected = {
    data: [{
      id: "60d2237267d0d8992e6118d7",
      message: "Handsome shot",
      owner: {
        firstName: "Debbie",
        id: "60d0fe4f5311236168a10a19",
        lastName: "Garcia",
        picture: "https://randomuser.me/api/portraits/med/women/86.jpg",
        title: "miss",
      },
      post: "60d21bf967d0d8992e610e9b",
      publishDate: "2019-12-12T18:57:30.941Z"
    }],
    limit: 5,
    page: 0,
    total: 1,
  }
  test('getCommentsForPost: should return resolved with list of comments by post id', (done) => {
    commentApi.getCommentsForPost('60d21bf967d0d8992e610e9b',0,5)
      .then(result => {
        expect(result).toEqual(expected)
        done()
      })
  })
})
