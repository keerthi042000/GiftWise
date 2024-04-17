const orderDA = require('./orderDA');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const secretKey = require('./../../config/default.json').secretKey;
const { httpUtil } = require('../../utils');
const oracledb = require('oracledb');

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
    const idProdut = body.idProduct;
    let userRewards
    delete body.idProduct;
    body.idUser = idUser;
    if (body.userRewards){
      userRewards = body.userRewards;
      delete body.userRewards;
    }
    const idPaymentMethod = req.body.idPaymentMethod;
    delete req.body.idPaymentMethod;
    const transactionObj = {
      idUser,
      idPaymentMethod,
      status: 'success',
      amount: req.body.totalAmount
    }
    body.out_orderId= { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    const result = await orderDA.addOrder(instanceOfSQLServer, body);
    const [orderId] = result.outBinds.OUT_ORDERID;
    const giftcardResponse = await axios.get(`http://localhost:3004/api/giftcard?idProduct=${idProdut}`);
    if (giftcardResponse.status!=200){
      return res.json(httpUtil.getException([null, giftcardResponse.data.errorMessage]))
    }
    const idGiftCard = giftcardResponse.data.payload[0].idGiftcard;
    const ProductOrderresult = await orderDA.addProductOrder(instanceOfSQLServer, orderId, idGiftCard);
    if (userRewards){
      await orderDA.insertRewardsHistory(instanceOfSQLServer, idUser, orderId);
      await orderDA.updateRewards(instanceOfSQLServer, idUser, userRewards.rewardPoints);
    }
    transactionObj.orderId = orderId;
    await orderDA.insertTransaction(instanceOfSQLServer, transactionObj)
    return res.json(httpUtil.getSuccess(ProductOrderresult));
  } catch (err) {
    console.log("Error while making order : ", err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }

};