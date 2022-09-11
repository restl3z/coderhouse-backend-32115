/* ---------- Modules ---------- */

const express = require('express');
const router_productos = require('./routes/productos.js');

/* ---------- Init ---------- */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', router_productos);

app.set('views', './src/views');
app.set('view engine', 'ejs');

/* ---------- Routes ---------- */

app.get('/', (req, res) => {
  res.render('pages/index');
});

/* ---------- Listener ---------- */

const PORT = 8080;
const server = app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Error: ${error}`));
