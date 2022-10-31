import mongoose from 'mongoose';

export const schema_products = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export const model_products = mongoose.model('Products', schema_products);
