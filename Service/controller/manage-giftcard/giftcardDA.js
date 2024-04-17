const sql = require('./sql');

exports.getAllGiftcard = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_GIFTCARD);

exports.getGiftcardByProductID = async (SQLConnection, idProduct) => SQLConnection.execute(sql.GET_GIFTCARD_BYPRODUCTID, {idProduct : idProduct, status:'Inactive'});

exports.updateGiftCardStatusByID = async (SQLConnection, idGiftcard) => SQLConnection.execute(sql.UPDATE_GIFTCARD_STATUS_BY_ID, {idGiftcard : idGiftcard, status:'Active'}, true);

exports.checkIfGiftcardExist = async (SQLConnection, idGiftcard) => SQLConnection.execute(sql.CHECK_GIFTCARD_EXIST, idGiftcard);

exports.addGiftcard = async (SQLConnection, giftcartArr) => SQLConnection.execute(sql.ADD_GIFTCARD, giftcartArr, true);
