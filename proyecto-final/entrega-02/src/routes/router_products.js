import { Router } from 'express';
import { dao_products as container_product } from '../persistence/daos/daos_config.js';

const IS_ADMIN = true;
const router = Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).send(await container_product.getAll());
  } catch (error) {
    res.status(500).send({
      message: 'Could not get products',
      error: error,
    });
  }
});

router.get('/:id', async (req, res) => {
  const lookupID = parseInt(req.params.id);
  try {
    const found_product = await container_product.getByID(lookupID);
    found_product
      ? res.status(200).send(found_product)
      : res.status(404).send({ message: 'Product not found' });
  } catch (error) {
    res.status(500).send({
      message: `Could not find product with ID ${lookupID}`,
      error: error,
    });
  }
});

router.post('/', async (req, res) => {
  if (IS_ADMIN === false) {
    res.status(403).send({
      error: -1,
      details: `${req.path} endpoint with ${req.method} method unauthorized`,
    });
  }
  const new_product = req.body;
  try {
    await container_product.save(new_product);
    res.status(200).send({
      message: 'Product added successfully',
      product: new_product,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Could not add product',
      error: error,
    });
  }
});

router.put('/:id', async (req, res) => {
  if (IS_ADMIN === false) {
    res.status(403).send({
      error: -1,
      details: `${req.path} endpoint with ${req.method} method unauthorized`,
    });
  }
  const lookupID = parseInt(req.params.id);
  const new_parameters = req.body;
  try {
    const updated_product = await container_product.updateByID(
      lookupID,
      new_parameters
    );
    updated_product
      ? res.status(200).send({
          message: 'Product modified successfully',
          product: updated_product,
        })
      : res.status(404).send({
          message: 'Product not found',
        });
  } catch (error) {
    res.status(500).send({
      message: 'Could not modify product',
      error: error,
    });
  }
});

router.delete('/:id', async (req, res) => {
  if (IS_ADMIN === false) {
    res.status(403).send({
      error: -1,
      details: `${req.path} endpoint with ${req.method} method unauthorized`,
    });
  }
  const lookupID = parseInt(req.params.id);
  try {
    const deleted_product = await container_product.deleteByID(lookupID);
    deleted_product
      ? res.status(200).send({
          message: 'Product deleted successfully',
        })
      : res.status(404).send({
          message: 'Product not found',
        });
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete product',
      error: error,
    });
  }
});

export default router;
