/* ---------- Modules ---------- */

const express = require('express');
const hbs = require('express-handlebars');
const router_productos = require('./routes/productos.js');

/* ---------- Init ---------- */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/productos', router_productos);

app.engine(
  'hbs',
  hbs.engine({
    partialsDir: './src/views/partials',
    layoutsDir: './src/views/layouts',
    extname: '.hbs',
    defaultLayout: 'index.hbs',
  })
);

app.set('views', './src/views');
app.set('view engine', 'hbs');

/* ---------- Routes ---------- */

app.get('/', (req, res) => {
  res.render('partials/form');
});

/* ---------- Listener ---------- */

const PORT = 8080;
const server = app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Error: ${error}`));
