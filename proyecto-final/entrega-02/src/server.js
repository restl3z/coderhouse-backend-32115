import express from 'express';
import router_products from './routes/router_products.js';
import router_carts from './routes/router_carts.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', router_products);
app.use('/api/carts', router_carts);

const PORT = process.env.PORT || 8080;

try {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.log('Server could not be started');
}
