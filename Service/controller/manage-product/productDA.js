const sql = require('./sql');

exports.getProduct = (SQLConnection, idProduct) => SQLConnection.execute(sql.GET_PRODUCT, { idProduct });

exports.getAllProduct = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_PRODUCT);

exports.getProductByBrandID = async (SQLConnection, idbrand) => SQLConnection.execute(sql.GET_PRODUCT_BYBRANDID, { idbrand });

exports.getProductByCategoryID = async (SQLConnection, idCategory) => SQLConnection.execute(sql.GET_PRODUCT_BYCATEGORYID, { idCategory });

exports.checkIfProductExist = async (SQLConnection, productObj) => SQLConnection.execute(sql.CHECK_PRODUCT_EXIST, productObj);

exports.addProduct = async (SQLConnection, productObj) => SQLConnection.execute(sql.ADD_PRODUCT, productObj, true);

exports.updateProduct = async (SQLConnection, productObj) => SQLConnection.execute(sql.UPDATE_PRODUCT, productObj, true);
