/* ---------- Modules ---------- */

import { Router } from 'express';
import Contenedor from '../classes/Contenedor.js';

/* ---------- Init ---------- */

const router = Router();
const container_cart = new Contenedor('./db/carts.json');

/* ---------- Routes ---------- */

router.post('/', async (req, res) => {
  try {
    await container_cart.save({ productos: [] });
    res.status(200).send({
      message: 'Carrito creado correctamente',
    });
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido crear el carrito',
      details: error,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    await container_cart.deleteByID(lookupID);
    res.status(200).send({
      message: 'Carrito eliminado correctamente',
    });
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido eliminar el carrito',
      details: error,
    });
  }
});

router.get('/:id/productos', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    let found = await container_cart.getByID(lookupID);
    if (found) {
      res.status(200).send(found.productos);
    } else {
      res.status(404).send({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).send({
      error: `No se ha podido obtener el carrito con ID ${lookupID}`,
      details: error,
    });
  }
});

router.post('/:id/productos', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    let new_product = req.body;
    let found = await container_cart.getByID(lookupID);
    if (found) {
      found.productos.push(new_product);
      await container_cart.updateByID(lookupID, found);
      res.status(200).send({
        message: 'Carrito actualizado correctamente',
      });
    } else {
      res.status(404).send({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).send({
      error: `No se ha podido agregar el producto al carrito`,
      details: error,
    });
  }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    let lookupID_prod = parseInt(req.params.id_prod);
    let found = await container_cart.getByID(lookupID);
    if (found) {
      let found_prod = found.productos.find((x) => x.id === lookupID_prod);
      if (found_prod) {
        let new_cart_products = found.productos.filter(
          (x) => x.id !== lookupID_prod
        );
        found.productos = new_cart_products;
        await container_cart.updateByID(lookupID, found);
        res.status(200).send({
          message: 'Producto eliminado correctamente',
        });
      } else {
        res.status(404).send({ error: 'Producto no encontrado' });
      }
    } else {
      res.status(404).send({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).send({
      error: `No se ha podido eliminar el producto del carrito`,
      details: error,
    });
  }
});

/* ---------- Exports ---------- */

export default router;
