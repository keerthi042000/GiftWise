const sql = require('./sql');

exports.getAllProduct = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_PRODUCT);

exports.getProductByBrandID = async (SQLConnection, id) => SQLConnection.execute(sql.GET_PRODUCT_BYBRANDID, {id});

exports.getProductByCategoryID = async (SQLConnection, id) => SQLConnection.execute(sql.GET_PRODUCT_BYCATEGORYID, {id});

exports.checkIfProductExist = async (SQLConnection, productObj) => SQLConnection.execute(sql.CHECK_PRODUCT_EXIST, productObj);

exports.addProduct = async (SQLConnection, productObj) => SQLConnection.execute(sql.ADD_PRODUCT, productObj, true);

exports.updateProduct = async (SQLConnection, productObj) => SQLConnection.execute(sql.UPDATE_PRODUCT, productObj, true);
