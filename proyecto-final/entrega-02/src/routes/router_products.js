import { Router } from 'express';
import DAO_Products_File from '../classes/daos/products/dao_products_file.js';

const IS_ADMIN = true;

const router = Router();
const container_product = new DAO_Products_File('./db/products.json');

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
  try {
    const lookupID = parseInt(req.params.id);
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
  try {
    const new_product = req.body;
    new_product.id = await container_product.save(new_product);
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
  try {
    const lookupID = parseInt(req.params.id);
    const new_parameters = req.body;
    const updated_product = await container_product.updateByID(
      lookupID,
      new_parameters
    );
    res.status(200).send({
      message: 'Product modified successfully',
      product: updated_product,
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
  try {
    const lookupID = parseInt(req.params.id);
    await container_product.deleteByID(lookupID);
    res.status(200).send({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete product',
      error: error,
    });
  }
});

export default router;
