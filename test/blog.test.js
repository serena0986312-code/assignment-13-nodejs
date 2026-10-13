const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { app } = require('../src/app');
const { connectDB } = require('../src/config/db');

let mongoServer;

describe('Blog API', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await connectDB(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  test('POST /blogs creates a new blog', async () => {
    const newBlog = {
      title: 'My first blog',
      description: 'A short description',
      author: 'Jane Doe'
    };

    const response = await request(app)
      .post('/blogs')
      .send(newBlog)
      .expect(201);

    expect(response.body).toMatchObject(newBlog);
    expect(response.body._id).toBeTruthy();
  });

  test('GET /blogs returns all blogs', async () => {
    await request(app)
      .post('/blogs')
      .send({
        title: 'Blog 1',
        description: 'Desc 1',
        author: 'Author One'
      })
      .expect(201);

    const response = await request(app)
      .get('/blogs')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
  });

  test('GET /blogs/:id returns one blog', async () => {
    const created = await request(app)
      .post('/blogs')
      .send({
        title: 'Blog 2',
        description: 'Desc 2',
        author: 'Author Two'
      })
      .expect(201);

    const response = await request(app)
      .get(`/blogs/${created.body._id}`)
      .expect(200);

    expect(response.body.title).toBe('Blog 2');
  });

  test('DELETE /blogs/:id deletes a blog', async () => {
    const created = await request(app)
      .post('/blogs')
      .send({
        title: 'Delete me',
        description: 'Will be removed',
        author: 'Author Three'
      })
      .expect(201);

    const response = await request(app)
      .delete(`/blogs/${created.body._id}`)
      .expect(200);

    expect(response.body.message).toBe('Blog deleted successfully');

    await request(app)
      .get(`/blogs/${created.body._id}`)
      .expect(404);
  });
});
