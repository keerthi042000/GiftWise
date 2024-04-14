const favDA = require('./favDA');
const { httpUtil } = require('../../utils')
const SQLServer = require('../../utils/db');
const secretKey = require('./../../config/default.json').secretKey;
const jwt = require('jsonwebtoken');
let instanceOfSQLServer = new SQLServer()

exports.getAllFav = async (req, res) => {
    try {
        console.log("inside fav");
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, secretKey);
        const idUser = decoded.idUser;
        const data = await favDA.getAllFav(instanceOfSQLServer, idUser);
        console.log("data : ", data);
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
        console.log("inside fav delete", req.params, idUser);
        const idProduct = req.params.idProduct;
        const data = await favDA.deleteFavByID(instanceOfSQLServer, idUser, idProduct);
        console.log("data : ", data);
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
