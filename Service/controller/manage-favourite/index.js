const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const favouriteHandler = require('./favHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.get('/', [_async(favouriteHandler.getAllFav)]);
router.post('/', [_async(favouriteHandler.addFav)]);
router.delete('/:idProduct', [_async(favouriteHandler.deleteFavByID)]);

module.exports = router;
