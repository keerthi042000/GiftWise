const sql = require('./sql');

exports.getAllPromocode = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_PROMOCODE);

exports.getAllPromocodeByProductId = async (SQLConnection, idProduct) => SQLConnection.execute(sql.GET_ALL_PROMOCODE_BY_PRODUCT_ID, { idProduct });

exports.checkIfPromocodeExist = async (SQLConnection,promoObj) => SQLConnection.execute(sql.CHECK_PROMOCODE_EXIST, promoObj);

exports.addPromocode = async (SQLConnection, promoObj) => SQLConnection.execute(sql.ADD_PROMOCODE, promoObj, true);

exports.updatePromocode = async (SQLConnection,promoObj) => SQLConnection.execute(sql.UPDATE_PROMOCODE, promoObj, true);

exports.deletePromocode = async (SQLConnection,promoObj) => SQLConnection.execute(sql.DELETE_PROMOCODE, promoObj, true);
