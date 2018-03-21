const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/shopping');

const products = [
  new Product({
    imagePath: 'http://www.pngmart.com/files/2/Mario-Transparent-Background.png',
    title: 'Gothic',
    description: 'Awesome Game!!',
    price: 10,
  }),
  new Product({
    imagePath: 'http://www.pngmart.com/files/2/Mario-Transparent-Background.png',
    title: 'Gothic',
    description: 'Awesome Game!!',
    price: 20,
  }),
  new Product({
    imagePath: 'http://www.pngmart.com/files/2/Mario-Transparent-Background.png',
    title: 'Gothic',
    description: 'Awesome Game!!',
    price: 30,
  }),
];
let done = 0;
for (let i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
