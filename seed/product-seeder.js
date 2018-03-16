const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

const products = [
  new Product({
    imagePath:
      'http://www.pngmart.com/files/2/Mario-Transparent-Background.png',
    title: 'Gothic',
    description: 'Awesome Game!!',
    price: 10
  }),
  new Product({
    imagePath:
      'http://www.pngmart.com/files/2/Mario-Transparent-Background.png',
    title: 'Gothic',
    description: 'Awesome Game!!',
    price: 10
  }),
  new Product({
    imagePath:
      'http://www.pngmart.com/files/2/Mario-Transparent-Background.png',
    title: 'Gothic',
    description: 'Awesome Game!!',
    price: 10
  })
];

for (let i = 0; i < products.length; i++) {
  products[i].save();
}
mongoose.disconnect();
