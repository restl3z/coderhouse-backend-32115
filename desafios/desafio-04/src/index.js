/* ---------- Modules ---------- */

const express = require('express');
const router_productos = require('./routes/productos.js');

/* ---------- Init ---------- */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/api/productos', router_productos);

/* ---------- Routes ---------- */

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido al servidor express');
});

/* ---------- Listener ---------- */

const PORT = 8080;
const server = app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Error: ${error}`));
