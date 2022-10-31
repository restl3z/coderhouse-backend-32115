import mongoose from 'mongoose';
import { schema_products } from './model_products.js';

const schema_carts = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  products: {
    type: [schema_products],
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

export const model_carts = mongoose.model('Carts', schema_carts);
