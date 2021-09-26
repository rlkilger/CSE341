const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title, price: req.body.price, desc: req.body.desc });
  res.redirect('/');
});

router.post('/remove-product', (req, res, next) => {
  const removeProduct = req.body.removeProduct;
  products.forEach(prod => {
    if (prod.title === removeProduct) {
      products.splice(prod, 1);
      console.log(`removed ${prod.title}`);
      return prod;
    }
  });
  res.redirect('/');
});


exports.routes = router;
exports.products = products;
