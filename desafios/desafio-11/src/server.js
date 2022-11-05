import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import Container from './classes/Container.js';
import {
  entity_message_collection,
  normalize,
} from './utils/normalizr_messages.js';
import { mock_products } from './utils/faker_products.js';

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
const router_product_test = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/api/product-test', router_product_test);

const container_product = new Container('./db/products.json');
const container_message = new Container('./db/messages.json');

socketServer.on('connection', async (client) => {
  console.log('Client connected!', `ID: ${client.id}`);

  client.on('disconnect', () => {
    console.log('Client disconnected!', `ID: ${client.id}`);
  });

  client.emit('update_products', await container_product.get_all_collection());

  client.on('product_added', async (new_product) => {
    await container_product.save(new_product);
    socketServer.sockets.emit(
      'update_products',
      await container_product.get_all_collection()
    );
  });

  client.emit(
    'update_messages',
    normalize(await container_message.get_all(), entity_message_collection)
  );

  client.on('message_added', async (new_message) => {
    await container_message.save(new_message);
    socketServer.sockets.emit(
      'update_messages',
      normalize(await container_message.get_all(), entity_message_collection)
    );
  });
});

router_product_test.get('/', async (req, res) => {
  const test_products = mock_products(5);
  socketServer.sockets.emit('products_test', test_products);
  res.send(test_products);
});

const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => console.log(`Server error: ${error}`));
