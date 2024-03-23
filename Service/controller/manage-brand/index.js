const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const brandHandler = require('./brandHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.get('/', [_async(brandHandler.getAllBrand)]);
router.post('/', [_async(brandHandler.addBrand)]);
router.put('/:idBrand', [_async(brandHandler.updateBrand)]);
// router.delete('/delete/:idBrand',[_async(brandHandler.deleteBrand)]);

module.exports = router;
