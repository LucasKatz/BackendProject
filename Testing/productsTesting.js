
import chai from 'chai';
import request from 'supertest';
import app from"../app.js";

const expect = chai.expect;

describe('GET /products', () => {
  it('should return paginated products', async () => {
    const res = await request(app).get('/products');
    
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.payload).to.be.an('array');
    // Agrega más expectativas según la estructura de tu respuesta
  });
});

describe('POST /products', () => {
    it('should create a new product and return 200 status', async () => {
      const newProduct = {
        title: 'New Product',
        description: 'A new product description',
        code: 'NP001',
        price: 19.99,
        thumbnail: 'new_product.jpg',
        stock: 10,
        category: 'New Category',
        status: 'active'
      };
      
      const res = await request(app)
        .post('/products')
        .send(newProduct);
  
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Producto creado');
      // Agrega más expectativas según tu lógica de respuesta
    });
  });

  
  describe('DELETE /products/:id', () => {
    it('should delete a product and return 200 status', async () => {
      const productIdToDelete = 'product_id_to_delete'; // Cambia esto con un ID real de producto
      const res = await request(app).delete(`/products/${productIdToDelete}`);
  
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Producto eliminado');
      // Agrega más expectativas según tu lógica de respuesta
    });
  });
  