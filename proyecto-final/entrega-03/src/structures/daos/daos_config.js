import { model_products } from '../models/model_products.js';
import { model_carts } from '../models/model_carts.js';

// Possible options:
// * File
// * MongoDB
// * Firebase
const persistance_choice = 'MongoDB';

const file_path_products = './db/products.json';
const file_path_carts = './db/carts.json';

let dao_products, dao_carts;

switch (persistance_choice) {
  case 'File':
    const { default: DAO_Products_File } = await import(
      './products/dao_products_file.js'
    );
    dao_products = new DAO_Products_File(file_path_products);
    break;
  case 'MongoDB':
    const { default: DAO_Products_MongoDB } = await import(
      './products/dao_products_mongodb.js'
    );
    dao_products = new DAO_Products_MongoDB(model_products);
    break;
  case 'Firebase':
    const { default: DAO_Products_Firebase } = await import(
      './products/dao_products_firebase.js'
    );
    dao_products = new DAO_Products_Firebase('Products');
    break;
}

switch (persistance_choice) {
  case 'File':
    const { default: DAO_Carts_File } = await import(
      './carts/dao_carts_file.js'
    );
    dao_carts = new DAO_Carts_File(file_path_carts);
    break;
  case 'MongoDB':
    const { default: DAO_Carts_MongoDB } = await import(
      './carts/dao_carts_mongodb.js'
    );
    dao_carts = new DAO_Carts_MongoDB(model_carts);
    break;
  case 'Firebase':
    const { default: DAO_Carts_Firebase } = await import(
      './carts/dao_carts_firebase.js'
    );
    dao_carts = new DAO_Carts_Firebase('Carts');
    break;
}

export { dao_products, dao_carts };
