const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const categoryHandler = require('./categoryHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring... Category');
  next();
});

router.get('/', [_async(categoryHandler.getAllCategory)]);
router.post('/', [_async(categoryHandler.addCategory)]);
router.put('/:idCategory', [_async(categoryHandler.updateCategory)]);
router.delete('/:idCategory',[_async(categoryHandler.deleteCategory)]);

module.exports = router;
