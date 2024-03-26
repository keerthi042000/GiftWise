const sql = require('./sql');

exports.getAllBrand = async(SQLConnection) => SQLConnection.execute(sql.GET_ALL_BRAND);

exports.addBrand = async (SQLConnection, obj) => SQLConnection.execute(sql.ADD_BRAND, obj, true);

exports.checkIfBrandExist = async (SQLConnection,obj) => SQLConnection.execute(sql.CHECK_BRAND_EXIST, obj);

exports.updateBrand = async (SQLConnection, obj) => SQLConnection.execute(sql.UPDATE_BRAND, obj, true);

exports.deleteBrand = async (SQLConnection, obj) => SQLConnection.execute(sql.DELETE_BRAND, obj, true);
