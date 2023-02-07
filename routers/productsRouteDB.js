import { Router } from "express";
import { ProductManager } from "../DAO/Class/DataBaseManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async(req, res) => {
  try {
    const product = await productManager.read();
    res.send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async(req, res) => {
  const {
    title,
    description,
    code,
    price,
    thumbnail,
    stock,
    category,
    status,
  } = req.body;

  if(
    !title ||
    !description||
    !code||
    !price||
    !thumbnail||
    !stock||
    !category||
    !status
  ) {
    res.status(400).send({error: "Faltan Datos"})
    return;
  }
  try {
    const response = await productManager.create({
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    });
    res.status(200).send({message:"Producto creado", response})
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;