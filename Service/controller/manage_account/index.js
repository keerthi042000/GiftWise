const express = require('express');
const router = express.Router();
const {asyncMiddleware:_async} = require('../../common');
const stockHandler = require('./stockHandler')
var cron = require('node-cron');

router.use((req, res, next) => {
  next();
});

// Module access defining here
router.use((req, res, next) => {
  console.log('All Routes are configuring... Stock');
  next();
});


cron.schedule('*/30 * * * * *', async () => {
  console.log("HERE")
  let result= await stockHandler.updateStockValue();
  console.log("result",result);
    if(result.length)
    global.io.emit('stockvalue', JSON.stringify(result));
    
    console.log("DONE")
});

 router.post('/login',[_async(stockHandler.login)]);
 router.post('/signup', [_async(stockHandler.signup)]);
 router.get('/account_overview',[_async(stockHandler.getAccountOverview)])
 router.post('/save',[_async(stockHandler.saveStockValue)]);
 router.get('/user/:idUser/list',[_async(stockHandler.getlist)])

 router.get('/getAllStockTransaction',[_async(stockHandler.getAllStockTransaction)]);
 router.get('/getAllUser',[_async(stockHandler.getAllUser)]);
 router.get('/getAllSystemAttributes',[_async(stockHandler.getAllSystemAttributes)]);
 router.get('/getAllUserGrants',[_async(stockHandler.getAllUserGrants)]);
 
 
module.exports = router;
