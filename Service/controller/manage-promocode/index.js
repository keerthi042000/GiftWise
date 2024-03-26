const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const promocodeHandler = require('./promocodeHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.get('/', [_async(promocodeHandler.getAllPromocode)]);
router.post('/', [_async(promocodeHandler.addPromocode)]);
router.put('/:idPromocode', [_async(promocodeHandler.updatePromocode)]);
router.delete('/:idPromocode',[_async(promocodeHandler.deletePromocode)]);

module.exports = router;
