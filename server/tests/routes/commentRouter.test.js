import request from "supertest";
import app from "../../src/app.js";

describe('commentRouter', () => {
  test('getCommentsByPost: should return status 200', async () => {
    const result = await request(app)
      .get('/api/post/60d21bf967d0d8992e610e9b/comment')
      .send()
    expect(result.statusCode).toBe(200)
  })

  test('getCommentsByPost: api error', async () => {
    const errorDesc = {error: "PARAMS_NOT_VALID"}
    const result = await request(app)
      .get('/api/post/646416841351634/comment')
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })
})
