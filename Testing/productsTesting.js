import supertest from "supertest";
import chai from "chai"



const expect = chai.expect
const requester = supertest('http://localhost:8080');

describe("Productos", () => {
  let productId; // Variable para almacenar el ID del producto creado

describe("POST /products", () => {
    it("debería crear un nuevo producto", (done) => {
    const product = {
        title: "Producto de prueba",
        description: "Descripción del producto de prueba",
        code: "123456",
        price: 9.99,
        thumbnail: "https://example.com/product.jpg",
        stock: 10,
        category: "Prueba",
        status: true,
    };

    requester
        .post("/products")
        .send(product)
        .expect(200)
        .end((err, res) => {
        if (err) return done(err);

        const { response } = res.body;
          productId = response._id; // Almacena el ID del producto creado para utilizarlo en otras pruebas

            expect(response.title).to.equal(product.title);
            expect(response.description).to.equal(product.description);
            expect(response.code).to.equal(product.code);
            expect(response.price).to.equal(product.price);
            expect(response.thumbnail).to.equal(product.thumbnail);
            expect(response.stock).to.equal(product.stock);
            expect(response.category).to.equal(product.category);
            expect(response.status).to.equal(product.status);

            done();
        });
    });
});

describe("GET /products/:pid", () => {
    it("debería obtener los detalles de un producto específico", (done) => {
    requester
        .get(`/products/${productId}`)
        .expect(200)
        .end((err, res) => {
        if (err) return done(err);

        const { response } = res.body;

        expect(response._id).to.equal(productId);

        done();
        });
    });
});
});