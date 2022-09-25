/* ---------- Modules ---------- */

import { Router } from 'express';
import Contenedor from '../classes/Contenedor.js';

/* ---------- Init ---------- */

const IS_ADMIN = true;

const router = Router();
const container_product = new Contenedor('./db/products.json');

/* ---------- Routes ---------- */

router.get('/', async (req, res) => {
  try {
    res.status(200).send(await container_product.getAll());
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido obtener el listado de productos',
      details: error,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    let found = await container_product.getByID(lookupID);
    if (found) {
      res.status(200).send(found);
    } else {
      res.status(404).send({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).send({
      error: `No se ha podido obtener el producto con ID ${lookupID}`,
      details: error,
    });
  }
});

router.post('/', async (req, res) => {
  if (IS_ADMIN === false) {
    res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.path} método ${req.method} no autorizada`,
    });
  }
  try {
    let newProduct = req.body;
    newProduct.id = await container_product.save(newProduct);
    res.status(200).send({
      message: 'Producto agregado correctamente',
      details: newProduct,
    });
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido agregar el producto',
      details: error,
    });
  }
});

router.put('/:id', async (req, res) => {
  if (IS_ADMIN === false) {
    res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.path} método ${req.method} no autorizada`,
    });
  }
  try {
    let lookupID = parseInt(req.params.id);
    let modifiedProduct = req.body;
    let updatedObject = await container_product.updateByID(
      lookupID,
      modifiedProduct
    );
    res.status(200).send({
      message: 'Producto modificado correctamente',
      details: updatedObject,
    });
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido modificar el producto',
      details: error,
    });
  }
});

router.delete('/:id', async (req, res) => {
  if (IS_ADMIN === false) {
    res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.path} método ${req.method} no autorizada`,
    });
  }
  try {
    let lookupID = parseInt(req.params.id);
    await container_product.deleteByID(lookupID);
    res.status(200).send({
      message: 'Producto eliminado correctamente',
    });
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido modificar el producto',
      details: error,
    });
  }
});

/* ---------- Exports ---------- */

export default router;
