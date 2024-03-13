var express = require('express');
const router = express.Router();
const {apiConfig} = require('../constants')
const stockController = require('./manage-stock')
const {
  STOCK
} = apiConfig;
const httpUtil = require('./../utils/httpUtil')

router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.use(STOCK.STOCK_API, stockController);
router.use((req, res, next) => res.json(httpUtil.getNotFound()));

module.exports = router;