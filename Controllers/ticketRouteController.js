import { Router } from "express";
import Crypto from "crypto";
import ticketModel from "../DAO/models/ticketModel.js";
import { noStockProducts } from "./cartsRouteDBController.js";

const router = Router();

export const getTicketModel = async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSpecificTicket = async (req, res) => {
  try {
    const ticket = await ticketModel.findById(req.params.id);
    res.render('ticket', { ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTicket = async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Encuentra el cartID en userModel
    const user = await userModel.findOne({ cartID: cartId });

    if (user) {
      // Obtiene los productos del carrito utilizando cartModel y el cartID del usuario
      const cart = await cartModel.findOne({ cartID: cartId }).lean().populate("products.product");

      if (cart) {
        if (cart.products.length > 0) {
          const ticketProducts = [];
          let subtotal = 0;

          // Calcular el subtotal y construir la lista de productos del ticket
          cart.products.forEach(product => {
            const productData = {
              name: product.product.name,
              price: product.product.price,
              quantity: product.quantity,
              totalPrice: product.quantity * product.product.price
            };

            ticketProducts.push(productData);
            subtotal += productData.totalPrice;
          });

          const total = subtotal; // Puedes aplicar aquí cualquier descuento o impuesto adicional

          // Crear el ticket en la base de datos utilizando ticketModel
          const ticket = await ticketModel.create({
            products: ticketProducts,
            subtotal: subtotal,
            total: total,
            purchaser: user.name
          });

          res.status(200).send({ message: "Ticket creado", ticket });
        } else {
          res.status(400).send("No se encuentran productos agregados al carrito.");
        }
      } else {
        res.status(400).send("El Carrito solicitado no contiene productos.");
      }
    } else {
      res.status(400).send("El cartID no está asociado a ningún usuario.");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const updateTicket =async (req, res) => {
  const myTicket = {
    purchase_datetime: req.body.purchase_datetime,
    amount: req.body.amount,
    purchaser: req.body.purchaser,
    updated_at: new Date(),
  };

  try {
    const ticket = await ticketModel.findByIdAndUpdate(myTicket);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*export const deleteTicket = async (req, res) => {
  try {
    const ticket = await ticketModel.findByIdAndDelete(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }};*/


  //Este metodo de delete ticket deja SOLO el array de productos que no se pudieron comprar
  export const deleteTicket = async (req, res) => {
    try {
      const ticket = await ticketModel.findOneAndUpdate(
        { _id: req.params.id },
        { $unset: { code: Crypto.randomBytes(16).toString("hex").substring(0, 4),
        purchase_datetime: req.body.purchase_datetime,
        amount: req.body.amount,
        purchaser: req.body.purchaser,
        created_at: new Date(),
        updated_at: new Date(),} },
        { new: true }
      );
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 

export default router;