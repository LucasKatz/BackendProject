import config from "../config/config.js";
import DatabaseManagerMongo from "./mongoClass/DataBaseManager.js";
import DatabaseManagerMemory from "./memory/DataBaseManager.js";

let DATA;
switch (config) { //si aca pongo config solo, inicia con mongo y va bien, pero si pongo config.DB_TYPE ahi vuelve al mismo error
  case "MONGO":
    console.log("iniciara con mongo");

    DATA = {
      CartManager: DatabaseManagerMongo.CartManager,
      ProductManager: DatabaseManagerMongo.ProductManager,
    };

    break;
  case "MEMORY":
    console.log("iniciara con memoria");
    DATA = {
      CartManager: DatabaseManagerMemory.CartManager,
      ProductManager: DatabaseManagerMemory.ProductManager,
    };
    break;
}
export default DATA;