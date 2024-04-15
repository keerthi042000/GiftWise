const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const productHandler = require('./productHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.get('/', [_async(productHandler.getAllProduct)]);
router.post('/', [_async(productHandler.addProduct)]);
router.put('/:idProduct', [_async(productHandler.updateProduct)]);
router.get('/:idProduct', [_async(productHandler.getProduct)]);

module.exports = router;
