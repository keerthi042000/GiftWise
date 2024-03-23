const express = require('express');
const router = express.Router();
const {asyncMiddleware:_async} = require('../../common');
const accountHandler = require('./accountHandler')

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring... Stock');
  next();
});

 router.post('/login',[_async(accountHandler.login)]);
 router.post('/signup', [_async(accountHandler.signup)]);
 router.get('/account_overview',[_async(accountHandler.getAccountOverview)])
 
module.exports = router;
