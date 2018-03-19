const express = require('express');

const router = express.Router();
const Product = require('../models/product');
const csrf = require('csurf');

const csrfProtection = csrf();

router.use(csrfProtection);
/* GET home page. */
router.get('/', (req, res, next) => {
  // Product.find((err, docs) =>
  //   // const productChunks = [];
  //   // const chunkSize = 3;
  //   // for (let i = 0; i < docs.length; i += chunkSize) {
  //   //   productChunks.push(docs.slice(i, i + chunkSize));
  //   // }
  //   res.render('shop/index', {
  //     title: 'Shopping Cart',
  //     products: docs,
  //   }));
  const products = Product.find();
  res.render('shop/index', { title: 'Shopping Cart', products });
});
// });
router.get('/user/signup', (req, res) => res.render('user/signup', { csrfToken: req.csrfToken() }));
router.post('/user/signup', (req, res) => {
  res.redirect('/');
});

module.exports = router;
