const orderDA = require('./orderDA');
const { httpUtil } = require('../../utils');

exports.getOrder = async (_, res,) => { 
  const idUser = _.query.idUser;
  const orderID = _.query.orderID;
  if (orderID){
    const data = await orderDA.getOrderbyOrderID(instanceOfSQLServer, orderID);
    return res.json(httpUtil.getSuccess(data));
  }
  const data = await orderDA.getOrder(instanceOfSQLServer, idUser);
  return res.json(httpUtil.getSuccess(data));
};

exports.getAllOrder = async (_, res,) => { 
  const data = await orderDA.getAllOrder(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));
};

exports.addOrder = async (req, res) => {
  const body = req.body;
  await orderDA.addOrder(instanceOfSQLServer, body);
  return res.json(httpUtil.getSuccess());
};