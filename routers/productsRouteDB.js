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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productManager.delete(id);

    res.status(200).send({ message: "Producto eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
  
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
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
  console.log(req.body);
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !thumbnail ||
    !stock ||
    !category
  ) {
    res.status(400).send({ error: "Faltan datos" });
    return;
  }
  try {
    const result = await productManager.update(id, {
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    });
    res.status(200).send({ message: "Producto actualizado", result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;