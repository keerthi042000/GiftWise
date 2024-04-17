const favDA = require('./favDA');
const { httpUtil } = require('../../utils')
const secretKey = require('./../../config/default.json').secretKey;
const jwt = require('jsonwebtoken');

exports.getAllFav = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, secretKey);
    const idUser = decoded.idUser;
    const data = await favDA.getAllFav(instanceOfSQLServer, idUser);
    return res.json(httpUtil.getSuccess(data));
  } catch (err) {
    console.log("Error while updating : ", err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }
};

exports.deleteFavByID = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, secretKey);
    const idUser = decoded.idUser;
    const idProduct = req.params.idProduct;
    const data = await favDA.deleteFavByID(instanceOfSQLServer, idUser, idProduct);
    return res.json(httpUtil.getSuccess(data));
  } catch (err) {
    console.log("Error while updating : ", err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }
};

exports.addFav = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, secretKey);
    const idUser = decoded.idUser;
    const idProduct = req.body.idProduct;
    const data = await favDA.addFav(instanceOfSQLServer, {  idUser, idProduct});
    return res.json(httpUtil.getSuccess(data));
  } catch (err) {
    console.log("Error while updating : ", err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }
}
