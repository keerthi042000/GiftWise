const SQLServer = require('../../utils/db');
const sql = require('./sql');

const SQLConnection = new SQLServer();

exports.getAllBrand = () => SQLConnection.execute(sql.GET_ALL_BRAND);

exports.addBrand = async (obj) => SQLConnection.execute(sql.ADD_BRAND, obj, true);

exports.checkIfBrandExist = (brandArr) => SQLConnection.execute(sql.CHECK_BRAND_EXIST, brandArr);

exports.updateBrand = (brandArr) => SQLConnection.execute(sql.UPDATE_BRAND, brandArr, true);
