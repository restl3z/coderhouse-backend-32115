/* ---------- Modules ---------- */

const fs = require('fs');
const express = require('express');

/* ---------- Class ---------- */

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Devuelve un array con los objetos presentes en el archivo.
  getAll = async () => {
    try {
      let content = await fs.promises.readFile(this.filePath, 'utf-8');
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

/* ---------- Init ---------- */

const contenedorProductos = new Contenedor('./db/productos.json');
const app = express();

/* ---------- Routes ---------- */

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido al servidor express');
});

app.get('/productos', async (req, res) => {
  res.status(200).send(await contenedorProductos.getAll());
});

app.get('/productoRandom', async (req, res) => {
  let array = await contenedorProductos.getAll();
  let randomNumber = Math.floor(Math.random() * array.length + 1);
  res.status(200).send(await contenedorProductos.getByID(randomNumber));
});

/* ---------- Listener ---------- */

const PORT = 8080;
const server = app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Error: ${error}`));
