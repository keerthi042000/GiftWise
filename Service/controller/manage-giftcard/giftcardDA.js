const SQLServer = require('../../utils/db');
const sql = require('./sql');

const SQLConnection = new SQLServer();

exports.getAllGiftcard = () => SQLConnection.execute(sql.GET_ALL_GIFTCARD);

exports.checkIfGiftcardExist = (idGiftcard) => SQLConnection.execute(sql.CHECK_GIFTCARD_EXIST, idGiftcard);

exports.addGiftcard = (giftcartArr) => SQLConnection.execute(sql.ADD_GIFTCARD, giftcartArr, true);
