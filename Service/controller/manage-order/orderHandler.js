const orderDA = require('./orderDA');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const secretKey = require('./../../config/default.json').secretKey;
const { httpUtil } = require('../../utils');
const oracledb = require('oracledb');
const email = require('./../../utils/email')
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
    const imageURL =  body.imageURL;
    delete body.imageURL
    let userRewards
    delete body.idProduct;
    body.idUser = idUser;
    if (body.userRewards){
      userRewards = body.userRewards;
      delete body.userRewards;
    }
    const idPaymentMethod = req.body.idPaymentMethod;
    delete req.body.idPaymentMethod;
    
    body.out_orderId= { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    const result = await orderDA.addOrder(instanceOfSQLServer, body);
    const [orderId] = result.outBinds.OUT_ORDERID;
    const giftcardResponse = await axios.get(`http://localhost:3004/api/giftcard?idProduct=${idProdut}`);
    if (giftcardResponse.data.status!=200){
      return res.json(httpUtil.getException([null, giftcardResponse.data.errorMessage]))
    }
    const idGiftCard = giftcardResponse.data.payload[0].idGiftcard;
    const giftCardNumber = giftcardResponse.data.payload[0].giftCardNumber;
    const giftCardPin = giftcardResponse.data.payload[0].giftCardPin;
    const ProductOrderresult = await orderDA.addProductOrder(instanceOfSQLServer, orderId, idGiftCard);
    if (userRewards){
      await orderDA.insertRewardsHistory(instanceOfSQLServer, idUser, orderId);
      await orderDA.updateRewards(instanceOfSQLServer, idUser, userRewards.rewardPoints);
    }
    const transactionObj = {
      idUser,
      idPaymentMethod,
      status: 'success',
      amount: req.body.totalAmount,
      orderId
    }
    await orderDA.insertTransaction(instanceOfSQLServer, transactionObj)
    await email.sendMail(decoded.emailId, giftCardNumber, giftCardPin, (+body.discount+ body.totalAmount), imageURL)
    await orderDA.insertNotification(instanceOfSQLServer, { idUser, orderId, message: `Email Id: ${decoded.emailId}; \n GiftCardNumber: ${giftCardNumber}; \n Amount: ${+body.discount + body.totalAmount}` })
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