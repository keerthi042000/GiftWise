const orderDA = require('./orderDA');
const jwt = require('jsonwebtoken');
const secretKey = require('./../../config/default.json').secretKey;
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
  try {
    const body = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, secretKey);
    const idUser = decoded.idUser;

    body.idUser = idUser;
    await orderDA.addOrder(instanceOfSQLServer, body);
    return res.json(httpUtil.getSuccess());
  } catch (err) {
    console.log("Error while making order : ", err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }

};