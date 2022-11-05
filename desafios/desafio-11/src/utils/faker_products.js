import { faker } from '@faker-js/faker';

const mock_products = (quantity) => {
  const test_products = [];
  for (let index = 1; index <= quantity; index++) {
    const mock = {
      title: faker.commerce.product(),
      price: faker.commerce.price(100, 2000, 0),
      thumbnail: faker.image.imageUrl(50, 50),
    };
    test_products.push(mock);
  }
  return test_products;
};

export { mock_products };
