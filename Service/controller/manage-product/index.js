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
router.post('/add', [_async(productHandler.addProduct)]);
router.put('/:idProduct', [_async(productHandler.updateProduct)]);
// router.delete('/delete/:idBrand',[_async(productHandler.deleteProduct)]);

module.exports = router;
