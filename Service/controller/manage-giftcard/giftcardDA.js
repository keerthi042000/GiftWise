const sql = require('./sql');

exports.getAllGiftcard = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_GIFTCARD);

exports.getGiftcardByProductID = async (SQLConnection, idProduct) => SQLConnection.execute(sql.GET_GIFTCARD_BYPRODUCTID, {idProduct});

exports.checkIfGiftcardExist = async (SQLConnection, idGiftcard) => SQLConnection.execute(sql.CHECK_GIFTCARD_EXIST, idGiftcard);

exports.addGiftcard = async (SQLConnection, giftcartArr) => SQLConnection.execute(sql.ADD_GIFTCARD, giftcartArr, true);
