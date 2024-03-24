const express = require('express');
const router = express.Router();
const { asyncMiddleware: _async } = require('../../common');
const accountHandler = require('./accountHandler')

// Module access defining here
router.use((_req, _res, next) => {
  console.log('All Routes are configuring...');
  next();
});

router.post('/login', [_async(accountHandler.login)]);
router.post('/signup', [_async(accountHandler.signup)]);
router.get('/logout', [_async(accountHandler.logout)]);
router.get('/account_overview', [_async(accountHandler.getAccountOverview)])

module.exports = router;
