import supertest from "supertest";
import chai from "chai"



const expect = chai.expect
const requester = supertest('http://localhost:8080');


describe("GET /api/carts/:cid", () => {
    it("debería devolver los productos del carrito si existe", (done) => {
    const cartId = "cartId"; // Reemplaza con un cartId válido existente

    requester
        .get(`/api/carts/${cartId}`)
        .expect(200)
        .end((err, res) => {
        if (err) return done(err);

        // Verifica la estructura de la respuesta
        expect(res.body).to.have.property("products");
        expect(res.body.products).to.be.an("array");

        done();
        });
    });

    it("debería devolver un error si el carrito no existe", (done) => {
    const cartId = "cartIdNoExistente"; // Reemplaza con un cartId que no exista

    requester
        .get(`/api/carts/${cartId}`)
        .expect(400)
        .end((err, res) => {
        if (err) return done(err);

        // Verifica el mensaje de error en la respuesta
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("El cartID no está asociado a ningún usuario");

        done();
        });
    });
});


describe("POST /api/carts/:cid/products/:pid", () => {
    it("debería agregar un producto al carrito si el carrito y el producto existen", (done) => {
      const cartId = "cartId"; // Reemplaza con un cartId válido existente
      const productId = "productId"; // Reemplaza con un productId válido existente

      const quantity = 1; // Reemplaza con la cantidad deseada

    requester
        .post(`/api/carts/${cartId}/products/${productId}`)
        .send({ quantity })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

          // Verifica la respuesta
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal("Producto agregado al carrito");
            expect(res.body).to.have.property("selectedCart");
            expect(res.body).to.have.property("result");

            done();
        });
    });

    it("debería devolver un error si el producto no existe", (done) => {
        const cartId = "cartId"; // Reemplaza con un cartId válido existente
        const productId = "productoNoExistente"; // Reemplaza con un productId que no exista
    
        const quantity = 1; // Reemplaza con la cantidad deseada
    
        requester
            .post(`/api/carts/${cartId}/products/${productId}`)
            .send({ quantity })
            .expect(400)
            .end((err, res) => {
            if (err) return done(err);
    
            // Verifica la respuesta
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.equal("El producto no existe");
    
            done();
        });
    });
});