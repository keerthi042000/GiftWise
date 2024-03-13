const stockDA = require('./stockDA');
const  { httpUtil, customException } = require('./../../utils')
const _ = require('lodash');

exports.login = async (req, res, next) => {
      const { username,password }= req.body;
      console.log('username,password',username,password)
      const data = await stockDA.verifyUser(username,password);
      if (_.isEmpty(data)) throw customException('User Not Found');
      
      return res.json(httpUtil.getSuccess(data));
};

exports.saveStockValue = async (req, res, next) => {
  const { idUser,idStock,value }= req.body;
  const checkUserGrants =  await stockDA.checkUserWriteAccess(idUser,idStock);
  if(checkUserGrants.length)
      { 
        const data = await stockDA.saveStockValue(idStock,value);    
       return res.json(httpUtil.getSuccess(data));
      }
  throw customException('Access Denied');
};
  
exports.getlist = async (req, res, next) => {
  const idUser = req.params.idUser;
  const data = await stockDA.getListOfStock(idUser);
  return res.json(httpUtil.getSuccess(data));
};

exports.updateStockValue= async () => {

  const result = await stockDA.getStockValue();
    if(result && result.length){
      await result.map(async val=>{
            await stockDA.saveStockValue(val.idStock,Math.floor(Math.random() * 999));
      })
      let getUpdateData = await stockDA.getAllStockValue() 
      return getUpdateData;
    }else 
      return [];
};

//extra API
exports.getAllStockTransaction =  async (req, res, next) => {
  const result = await  stockDA.getAllStockTransaction();
  res.json(httpUtil.getSuccess(result))
}

exports.getAllUser =  async (req, res, next) => {
  const result = await  stockDA.getAllUser();
  res.json(httpUtil.getSuccess(result))
}
exports.getAllSystemAttributes =  async (req, res, next) => {
  const result = await  stockDA.getAllSystemAttributes();
  res.json(httpUtil.getSuccess(result))
}
exports.getAllUserGrants =  async (req, res, next) => {
  const result = await  stockDA.getAllUserGrants();
  res.json(httpUtil.getSuccess(result))
}
