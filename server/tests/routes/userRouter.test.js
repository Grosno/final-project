import request from "supertest";
import app from "../../src/app.js";

describe('userRouter.getUsers', () => {
  test('should return status 200', async () => {
    const result = await request(app)
      .get('/api/user?page=0&limit=6')
      .send()
    expect(result.statusCode).toBe(200)
  })
})

describe('userRouter.getUserById', () => {
  test('should return status 200', async () => {
    const result = await request(app)
      .get('/api/user/60d0fe4f5311236168a109ca')
      .send()
    expect(result.statusCode).toBe(200)
  })
  test('should return status 200 with api error', async () => {
    const errorDesc = {error: "PARAMS_NOT_VALID"}
    const result = await request(app)
      .get('/api/user/60d0fe4f5311236168a109asdf')
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })
})

describe('userRouter.createUser', () => {
  test('should return status 200', async () => {
    const result = await request(app)
      .post('/api/user/create')
      .send({
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'any@example.com'
      })
    expect(result.statusCode).toBe(200)
  })
  test('should return status 200 with api error', async () => {
    const errorDesc = {
      error: "BODY_NOT_VALID",
      data:{
        lastName:"Path `lastName` is required.",
        firstName:"Path `firstName` is required.",
        email:"Path `email` is required."
      }
    }
    const result = await request(app)
      .post('/api/user/create')
      .send()
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })
})

describe('userRouter.updateUser', () => {
  test('should return status 200', async () => {
    const result = await request(app)
      .put('/api/user/60d0fe4f5311236168a109ca')
      .send({
        firstName: 'Elena',
      })
    expect(result.statusCode).toBe(200)
  })

  test('should return status 200 with api error', async () => {
    const errorDesc = { error: "PARAMS_NOT_VALID" }
    const result = await request(app)
      .put('/api/user/60d0fe4f5311236168a109caasdasd')
      .send({
        firstName: 'Elena'
      })
    expect(result.statusCode).toBe(200)
    expect(result.text).toEqual(JSON.stringify(errorDesc))
  })
})
