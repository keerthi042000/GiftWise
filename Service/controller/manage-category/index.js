const express = require('express');

const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const categoryHandler = require('./categoryHandler');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.get('/', [_async(categoryHandler.getAllCategory)]);
router.post('/add', [_async(categoryHandler.addCategory)]);
router.put('/:categoryId', [_async(categoryHandler.updateCategory)]);
// router.delete('/delete/:categoryId',[_async(categoryHandler.deleteCategory)]);

module.exports = router;
