import { Router } from 'express';
import { dao_carts as container_cart } from '../persistence/daos/daos_config.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    await container_cart.save({ products: [] });
    res.status(200).send({
      message: 'Cart created successfully',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Could not create cart',
      error: error,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const lookupID = parseInt(req.params.id);
  try {
    const found_cart = await container_cart.deleteByID(lookupID);
    found_cart
      ? res.status(200).send({
          message: 'Cart deleted successfully',
        })
      : res.status(404).send({
          message: 'Cart not found',
        });
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete cart',
      error: error,
    });
  }
});

router.get('/:id/products', async (req, res) => {
  const lookupID = parseInt(req.params.id);
  const found_cart = await container_cart.getByID(lookupID);
  try {
    found_cart.products === []
      ? res.status(200).send(found_cart.products)
      : res.status(404).send({ message: 'Cart not found' });
  } catch (error) {
    res.status(500).send({
      message: `Could not find cart with ID ${lookupID}`,
      error: error,
    });
  }
});

router.post('/:id/products', async (req, res) => {
  const lookupID = parseInt(req.params.id);
  const new_product = req.body;
  try {
    const found_cart = await container_cart.getByID(lookupID);
    if (found_cart) {
      found_cart.products.push(new_product);
      await container_cart.updateByID(lookupID, found_cart);
      res.status(200).send({
        message: 'Product added to cart successfully',
      });
    } else {
      res.status(404).send({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Could not add product to cart',
      error: error,
    });
  }
});

router.delete('/:id/products/:id_prod', async (req, res) => {
  const lookupID = parseInt(req.params.id);
  const lookupID_product = parseInt(req.params.id_prod);
  try {
    const result = await container_cart.deleteCartProduct(
      lookupID,
      lookupID_product
    );
    res.status(result.status_code).send({ message: result.message });
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete product from cart',
      error: error,
    });
  }
});

export default router;
