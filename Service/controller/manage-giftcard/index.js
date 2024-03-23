const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const giftcardHandler = require('./giftcardHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.get('/', [_async(giftcardHandler.getAllGiftcard)]);
router.post('/', [_async(giftcardHandler.addGiftcard)]);

module.exports = router;
