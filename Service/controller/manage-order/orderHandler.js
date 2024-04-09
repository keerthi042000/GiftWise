const orderDA = require('./orderDA');
const { httpUtil } = require('../../utils');
const SQLServer = require('../../utils/db');
let instanceOfSQLServer = new SQLServer()

exports.getOrder = async (_, res,) => { 
  const data = await orderDA.getOrder(instanceOfSQLServer, idUser);
  return res.json(httpUtil.getSuccess(data));
};

exports.getAllOrder = async (_, res,) => { 
  const data = await orderDA.getAllOrder(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));
};

exports.addOrder = async (req, res) => {
  const body = req.body;
  let instanceOfSQLServer = new SQLServer()
  await orderDA.addOrder(instanceOfSQLServer, body);
  return res.json(httpUtil.getSuccess());
};