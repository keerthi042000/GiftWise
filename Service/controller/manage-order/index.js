const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const orderHandler = require('./orderHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.get('/', [_async(orderHandler.getOrder)]);
router.get('/allOrders', [_async(orderHandler.getAllOrder)]);
router.post('/', [_async(orderHandler.addOrder)]);


module.exports = router;
