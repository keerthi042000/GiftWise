const express = require('express');

const router = express.Router();
const { apiConfig } = require('../constants');

const brandController = require('./manage-brand');
const productController = require('./manage-product');

const categoryController = require('./manage-category');
const promocodeController = require('./manage-promocode');
const accountController = require('./manage-account');

const { API } = apiConfig;
const httpUtil = require('../utils/httpUtil');

router.use((_req, _res, next) => { 
  console.log('All Routes are configuring...');
  next();
});

router.use(API.BRAND_API, brandController);
router.use(API.PRODUCT_API, productController);

router.use(API.CATEGORY_API, categoryController);
router.use(API.PROMOCODE_API, promocodeController);
router.use(API.ACCOUNT_API, accountController);

// eslint-disable-next-line no-unused-vars
router.use((req, res, next) => res.json(httpUtil.getNotFound()));

module.exports = router;
