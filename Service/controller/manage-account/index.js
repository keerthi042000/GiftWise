const express = require('express');
const router = express.Router();
const { asyncMiddleware: _async, authFilterMiddleware } = require('../../common');
const accountHandler = require('./accountHandler')

// Module access defining here
router.use((_req, _res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.post('/login', [_async(accountHandler.login)]);
router.post('/signup', [_async(accountHandler.signup)]);
router.post('/feedback', [_async(accountHandler.saveFeedback)]);
router.get('/account_overview', [_async(accountHandler.getAccountOverview)])
router.put('/update_details', [_async(accountHandler.updateAccount)])

module.exports = router;
