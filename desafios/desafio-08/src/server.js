import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import Container from './classes/Container.js';
import db_init from '../db/create_tables.js';
import { config_MariaDB, config_SQLite } from '../db/db_config.js';

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

db_init();

const container_product = new Container(config_MariaDB, 'products');
const container_message = new Container(config_SQLite, 'messages');

socketServer.on('connection', async (client) => {
  console.log('Client connected!', `ID: ${client.id}`);

  client.on('disconnect', () => {
    console.log('Client disconnected!', `ID: ${client.id}`);
  });

  client.emit('update_products', await container_product.get_all());

  client.on('product_added', async (new_product) => {
    await container_product.save(new_product);
    socketServer.sockets.emit(
      'update_products',
      await container_product.get_all()
    );
  });

  client.emit('update_messages', await container_message.get_all());

  client.on('message_added', async (new_message) => {
    await container_message.save(new_message);
    socketServer.sockets.emit(
      'update_messages',
      await container_message.get_all()
    );
  });
});

const PORT = process.env.PORT | 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Server error: ${error}`));
