import fs from 'fs';

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getAll = async () => {
    try {
      let content = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Error en lectura: ${error.message}`);
    }
  };

  save = async (newObject) => {
    let currentObjects = await this.getAll();

    if (currentObjects.length > 0) {
      newObject.id = currentObjects[currentObjects.length - 1].id + 1;
    } else {
      newObject.id = 1;
    }

    newObject.timestamp = new Date().toLocaleString();

    currentObjects.push(newObject);

    await fs.promises
      .writeFile(this.filePath, JSON.stringify(currentObjects))
      .catch((error) => {
        throw new Error(`Error en escritura: ${error.message}`);
      });

    return newObject.id;
  };

  getByID = async (lookupID) => {
    let currentObjects = await this.getAll();
    let found = currentObjects.find((x) => x.id === lookupID);
    if (!found) {
      found = null;
    }
    return found;
  };

  deleteByID = async (lookupID) => {
    let currentObjects = await this.getAll();
    let tempList = currentObjects.filter((x) => x.id !== lookupID);
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(tempList));
    } catch (error) {
      throw new Error(`Error en escritura: ${error.message}`);
    }
  };

  deleteAll = async () => {
    await fs.promises.writeFile(this.filePath, JSON.stringify([]));
  };

  updateByID = async (lookupID, modifiedObject) => {
    try {
      let currentObjects = await this.getAll();
      let foundIndex = currentObjects.findIndex((x) => x.id === lookupID);
      let updatedObjects = currentObjects;
      modifiedObject.id = lookupID;
      updatedObjects[foundIndex] = modifiedObject;
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(updatedObjects)
      );
      return modifiedObject;
    } catch (error) {
      throw new Error(`Error en escritura: ${error.message}`);
    }
  };
}

export default Contenedor;
