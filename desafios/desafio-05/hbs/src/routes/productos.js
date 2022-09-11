/* ---------- Modules ---------- */

const { Router } = require('express');
const Contenedor = require('../classes/Contenedor.js');

/* ---------- Init ---------- */

const router = Router();
const contenedorProductos = new Contenedor('./db/productos.json');

/* ---------- Routes ---------- */

// Devuelve todos los productos
router.get('/', async (req, res) => {
  try {
    let productos = await contenedorProductos.getAll();
    res.render('partials/table', { layout: 'productos', productos });
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido obtener el listado de productos',
      details: error,
    });
  }
});

// Devuelve un producto según su ID
router.get('/:id', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    let found = await contenedorProductos.getByID(lookupID);
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

// Agrega un producto, y lo devuelve junto con su id asignado
router.post('/', async (req, res) => {
  try {
    let newProduct = req.body;
    newProduct.id = await contenedorProductos.save(newProduct);
    res.redirect('/');
  } catch (error) {
    res.status(500).send({
      error: 'No se ha podido agregar el producto',
      details: error,
    });
  }
});

// Actualiza un producto según su ID
router.put('/:id', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    let modifiedProduct = req.body;
    let updatedObject = await contenedorProductos.updateByID(
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

// Elimina un producto según su ID
router.delete('/:id', async (req, res) => {
  try {
    let lookupID = parseInt(req.params.id);
    await contenedorProductos.deleteByID(lookupID);
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

module.exports = router;
