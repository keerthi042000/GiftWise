const httpUtil = require('../utils/httpUtil');
const sqlError = require('../constants');

exports.errorLogMiddleware = (err, req, res, next) => {
  console.log('App Error', err);
  next(err);
};

// eslint-disable-next-line consistent-return
exports.customError = (err, req, res, next) => {
  if (err.custome) return res.json(httpUtil.getBadRequest([null, err.message]));
  next(err);
};

exports.validationErrorMiddleware = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const {
      details: [{
        message,
      }],
      code,
    } = err;

    res.json(httpUtil.getBadRequest([code, message.replace(/['"]+/g, '')]));
  } else {
    next(err);
  }
};

exports.handleExceptionSQLMiddleware = (err, req, res, next) => {
  // console.log('url ->: https://mariadb.com/kb/en/mariadb-error-codes/');
  if (err.code === sqlError[err.errno]) {
    const { code, errno } = err;
    res.json(httpUtil.getException([errno, code]));
  } else {
    next(err);
  }
};
