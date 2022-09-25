/* ---------- Modules ---------- */

import express from 'express';
import router_product from './routes/product.js';
import router_cart from './routes/cart.js';

/* ---------- Init ---------- */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', router_product);
app.use('/api/carrito', router_cart);

/* ---------- Routes ---------- */

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido al servidor express');
});

app.get('*', (req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta ${req.path} - método ${req.method} no implementados`,
  });
});

/* ---------- Listener ---------- */

const PORT = process.env.PORT | 8080;
const server = app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Error: ${error}`));
