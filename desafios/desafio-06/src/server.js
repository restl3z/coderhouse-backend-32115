/* ---------- Modules ---------- */

const fs = require('fs');
const express = require('express');
const http = require('http');
const { Server: SocketServer } = require('socket.io');

/* ---------- Init ---------- */

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

const productList = [
  {
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1,
  },
  {
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    id: 2,
  },
  {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    id: 3,
  },
];

const message_file = './db/messages.json';

/* ---------- WebSocket ---------- */

socketServer.on('connection', async (client) => {
  console.log('Client connected!', `ID: ${client.id}`);

  client.on('disconnect', () => {
    console.log('Client disconnected!', `ID: ${client.id}`);
  });

  client.emit('update_products', productList);

  client.on('product_added', (new_product) => {
    if (productList.length > 0) {
      new_product.id = productList[productList.length - 1].id + 1;
    } else {
      new_product.id = 1;
    }

    productList.push(new_product);

    socketServer.sockets.emit('update_products', productList);
  });

  client.emit(
    'update_messages',
    JSON.parse(await fs.promises.readFile(message_file, 'utf-8'))
  );

  client.on('message_added', async (new_message) => {
    try {
      let current_messages = JSON.parse(
        await fs.promises.readFile(message_file, 'utf-8')
      );
      current_messages.push(new_message);
      await fs.promises.writeFile(
        message_file,
        JSON.stringify(current_messages, null, 2)
      );
    } catch (error) {
      throw new Error(`Error en escritura: ${error.message}`);
    }
    socketServer.sockets.emit(
      'update_messages',
      JSON.parse(await fs.promises.readFile(message_file, 'utf-8'))
    );
  });
});

/* ---------- Listener ---------- */

const PORT = process.env.PORT | 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Server error: ${error}`));
