import supertest from "supertest";
import app from"../app.js";
import { expect } from "chai";
import  request  from "supertest";

const requester = supertest('http://localhost:808');


describe('Login Endpoint', () => {
  it('should log in a user and return 200 status', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'l.katz92@gmail.com', password: '12345' }); // Ajusta los datos de prueba

    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('logged in');
  });

  it('should return 400 status for incorrect credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'wronguser', password: 'wrongpassword' });

    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('Incorrect credentials');
  });
});


describe('Signup Endpoint', () => {
  it('should create a new user and return 201 status', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: 'testpassword',
        age: 25,
      });

    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('Usuario Creado');
  });

  it('should return 400 status for incomplete user data', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ first_name: 'Test', last_name: 'User' }); // Incomplete data

    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('Failed to create user');
  });
});


describe('Authenticated Routes', () => {
  it('should access authenticated route with valid session', async () => {
    const agent = request.agent(app); // Create an agent to maintain session

    // Simulate a successful login first
    await agent.post('/login').send({ username: 'testuser', password: 'testpassword' });

    const res = await agent.get('/current');

    expect(res.statusCode).to.equal(200);
    expect(res.text).to.include('Welcome,'); // Adjust based on your rendered content
  });

  it('should return 401 for accessing authenticated route without session', async () => {
    const res = await request(app).get('/current');

    expect(res.statusCode).to.equal(401);
  });
});
