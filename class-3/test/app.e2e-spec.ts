import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/app/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/app/12345')
      .expect(200)
      .expect('12345');
  });

  it('/books CRUD', async () => {
    const server = app.getHttpServer();
    const input = {
      title: '1984',
      publishedYear: 1949,
      author: { firstName: 'George', lastName: 'Orwell' },
    };

    const created = await request(server)
      .post('/books')
      .send(input)
      .expect(201);
    const id: string = created.body.id;
    expect(created.body).toEqual({ id, ...input });

    await request(server)
      .get('/books')
      .expect(200)
      .expect([{ id, ...input }]);
    await request(server)
      .get(`/books/${id}`)
      .expect(200)
      .expect({ id, ...input });

    const updated = await request(server)
      .patch(`/books/${id}`)
      .send({ title: 'Animal Farm' })
      .expect(200);
    expect(updated.body.title).toBe('Animal Farm');
    expect(updated.body.publishedYear).toBe(1949);

    await request(server).delete(`/books/${id}`).expect(200);
    await request(server).get(`/books/${id}`).expect(404);
    await request(server).delete(`/books/${id}`).expect(404);
  });

  it('/books rejects invalid input', async () => {
    const server = app.getHttpServer();
    await request(server).post('/books').send({ title: 2 }).expect(400);
    await request(server)
      .post('/books')
      .send({
        title: 'Old',
        publishedYear: 1400,
        author: { firstName: 'A', lastName: 'B' },
      })
      .expect(400);
    await request(server)
      .post('/books')
      .send({ title: 'No author', publishedYear: 2000 })
      .expect(400);
    await request(server)
      .post('/books')
      .send({
        title: 'No last name',
        publishedYear: 2000,
        author: { firstName: 'A' },
      })
      .expect(400);
    await request(server)
      .patch('/books/any')
      .send({ publishedYear: 2030 })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});
