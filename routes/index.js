const express = require('express');

const router = express.Router();
const csrf = require('csurf');
const Product = require('../models/product');
const Cart = require('../models/cart');

const csrfProtection = csrf();

router.use(csrfProtection);
/* GET home page. */
router.get('/', (req, res) => {
  Product.find((err, docs) => {
    const productChunks = [];
    const chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {
      title: 'Shopping Cart',
      products: productChunks,
    });
  });
  // const products = Product.find();
  // res.render('shop/index', { title: 'Shopping Cart', products });
});

router.get('/add-to-cart/:id', (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart.items : {});

  Product.findById(productId, (err, product) => {
    console.log('product', product);
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    cart.add(product, product._id);
    req.session.cart = cart;
    console.log('here', req.session.cart.items);
    res.redirect('/');
  });
});

module.exports = router;
