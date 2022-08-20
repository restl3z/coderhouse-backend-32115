const fs = require("fs");

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Devuelve un array con los objetos presentes en el archivo.
  getAll = async () => {
    try {
      let content = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Error en lectura: ${error.message}`);
    }
  };

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  save = async (newObject) => {
    let currentObjects = await this.getAll();

    if (currentObjects.length > 0) {
      newObject.id = currentObjects[currentObjects.length - 1].id + 1;
    } else {
      newObject.id = 1;
    }

    currentObjects.push(newObject);

    await fs.promises
      .writeFile(this.filePath, JSON.stringify(currentObjects))
      .catch((error) => {
        throw new Error(`Error en escritura: ${error.message}`);
      });

    return newObject.id;
  };

  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  getByID = async (lookupID) => {
    let currentObjects = await this.getAll();
    let found = currentObjects.find((x) => x.id === lookupID);
    if (!found) {
      found = null;
    }
    return found;
  };

  // Elimina del archivo el objeto con el id buscado.
  deleteByID = async (lookupID) => {
    let currentObjects = await this.getAll();
    let tempList = currentObjects.filter((x) => x.id !== lookupID);
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(tempList));
    } catch (error) {
      throw new Error(`Error en escritura: ${error.message}`);
    }
  };

  // Elimina todos los objetos presentes en el archivo.
  deleteAll = async () => {
    await fs.promises.writeFile(this.filePath, JSON.stringify([]));
  };
}

let nuevo = new Contenedor("./productos.json");

let objetoPrueba = {
  title: "Armadura",
  price: 50000,
  thumbnail:
    "https://cdn-icons.flaticon.com/png/512/3763/premium/3763485.png?token=exp=1642210612~hmac=8c65c48e8e1b2260edd5d90e2a671f3d",
};

let objetoPrueba2 = {
  title: "Arco",
  price: 10000,
  thumbnail: "https://cdn-icons-png.flaticon.com/512/3763/3763337.png",
};

let objetoPrueba3 = {
  title: "Lanza",
  price: 40000,
  thumbnail:
    "https://cdn-icons.flaticon.com/png/512/3764/premium/3764534.png?token=exp=1642210621~hmac=0f9bbac1f5656c374fb0e8ddf7663391",
};

const test = async () => {
  //   console.log("Listado actual: ", await nuevo.getAll());
  //   console.log("Agregamos el objeto 1: ", await nuevo.save(objetoPrueba));
  //   console.log("Agregamos el objeto 2: ", await nuevo.save(objetoPrueba2));
  //   console.log("Agregamos el objeto 3: ", await nuevo.save(objetoPrueba3));
  //   console.log("Listado actual: ", await nuevo.getAll());
  //   console.log("Buscamos objeto con ID 2: ", await nuevo.getByID(2));
  //   console.log("Buscamos objeto con ID 4: ", await nuevo.getByID(4));
  //   console.log("Borramos el objeto con ID 2: ", await nuevo.deleteByID(2));
  //   console.log("Listado actual: ", await nuevo.getAll());
  //   await nuevo.deleteAll();
};

test();
