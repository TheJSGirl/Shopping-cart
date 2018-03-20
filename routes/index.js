const express = require('express');

const router = express.Router();
const csrf = require('csurf');
const Product = require('../models/product');

const csrfProtection = csrf();

router.use(csrfProtection);
/* GET home page. */
router.get('/', (req, res) => {
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

module.exports = router;
