import { Router } from 'express';
import { faker } from '@faker-js/faker';

const router = Router();

router.get('/', (req, res) => {
  const test_products = [];
  for (let index = 1; index <= 5; index++) {
    const mock = {
      title: faker.commerce.product(),
      price: faker.commerce.price(100, 2000, 0),
      thumbnail: faker.image.imageUrl(50, 50),
    };
    test_products.push(mock);
  }
  res.json({ response: test_products });
});

export default router;
