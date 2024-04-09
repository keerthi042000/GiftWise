const sql = require('./sql');
exports.getOrder = async (SQLConnection , obj) => SQLConnection.execute(sql.GET_INDIVIDUAL_ORDER, obj);

exports.getAllOrder = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_ORDER);

exports.addOrder = async (SQLConnection, obj) => SQLConnection.execute(sql.ADD_ORDER, obj, true);
