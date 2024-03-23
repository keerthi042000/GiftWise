const httpUtil = require('./httpUtil');
const db = require('./db');

function customException(message, code) {
  const error = new Error(message);
  error.code = code;
  error.custome = true;
  return error;
}
module.exports = {
  httpUtil,
  db,
  customException,
};
