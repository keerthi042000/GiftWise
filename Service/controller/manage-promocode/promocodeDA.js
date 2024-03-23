const SQLServer = require('../../utils/db');
const sql = require('./sql');

const SQLConnection = new SQLServer();

exports.getAllPromocode = () => SQLConnection.execute(sql.GET_ALL_PROMOCODE);

exports.checkIfPromocodeExist = (promoObj) => SQLConnection.execute(sql.CHECK_PROMOCODE_EXIST, promoObj);

exports.addPromocode = (promoObj) => SQLConnection.execute(sql.ADD_PROMOCODE, promoObj, true);

exports.updatePromocode = (promoObj) => SQLConnection.execute(sql.UPDATE_PROMOCODE, promoObj, true);
