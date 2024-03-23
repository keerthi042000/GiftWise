const SQLServer = require('../../utils/db');
const sql = require('./sql');

const SQLConnection = new SQLServer();

exports.getAllProduct = () => SQLConnection.execute(sql.GET_ALL_PRODUCT);

exports.checkIfProductExist = (productObj) => SQLConnection.execute(sql.CHECK_PRODUCT_EXIST, productObj);

exports.addProduct = (productObj) => SQLConnection.execute(sql.ADD_PRODUCT, productObj, true);

exports.updateProduct = (productObj) => SQLConnection.execute(sql.UPDATE_PRODUCT, productObj, true);
