import supertest from "supertest";
import { expect } from "chai";

const requester = supertest('http://localhost:8080');

describe('Sessions Routes', () => {
  // Test para el registro de un nuevo usuario
  describe('POST /signup', () => {
    it('Debería registrar un nuevo usuario exitosamente', (done) => {
      requester
        .post('/signup')
        .send({
          first_name: 'Michael',
          last_name: 'Jackson',
          email: 'jackson5@gmail.com',
          password: 'thriller',
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'Usuario Creado');
          expect(res.body.data).to.have.property('email', 'jackson5@gmail.com');
          done();
        });
    });

    it('Debería retornar un error al intentar registrar un usuario existente', (done) => {
      requester
        .post('/signup')
        .send({
          first_name: 'Michael',
          last_name: 'Jackson',
          email: 'jackson5@gmail.com',
          password: 'thriller',
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message', 'Failed to create user');
          done();
        });
    });
  });

  // Test para iniciar sesión
  describe('POST /login', () => {
    it('Debería iniciar sesión exitosamente con credenciales válidas', (done) => {
      requester
        .post('/login')
        .send({
          email: 'jackson5@gmail.com',
          password: 'thriller',
        })
        .expect(302)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.headers.location).to.equal('/current');
          done();
        });
    });
  });
});
