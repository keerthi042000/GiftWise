const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { httpUtil, customException } = require('../utils');
const securityDA = require('./securityDA');
const secretKey = require('./../config/default.json').secretKey;

exports.authFilterMiddleware = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const sess = req.session;
    sess.token = token;
    if (token && `${token}`.split('.').length > 1) {
      const userInfo = jwt.verify(token, secretKey);
      const { idUser, emailId } = userInfo;
      if (_.isEmpty(userInfo) || _.isEmpty(emailId)) {
        return res.json(httpUtil.getUnauthorized());
      }
      const [user = {}] = await securityDA.findUserByUserId({idUser});
      if (_.isEmpty(user)) {
        return res.json(httpUtil.getUnauthorized());
      } 
      res.locals.bnum = user.idUser;
      res.locals.email = user.emailId;
      next();
    }
    else {
      throw customException('Token Expired/ Invalid Token');
    }
  }
  catch (error) {
    console.log(error)
    return res.json(httpUtil.getUnauthorized());
  }
};