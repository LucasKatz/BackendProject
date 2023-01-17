const express = require("express");
const viewsRouter = express.Router();
const fs = require ('fs')

viewsRouter.get ("/", async (req, res) => { 
    const products = await readFile(); 
    res.render("home", {products} );
});