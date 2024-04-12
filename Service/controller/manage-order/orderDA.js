const sql = require('./sql');
exports.getOrder = async (SQLConnection , idUser) => SQLConnection.execute(sql.GET_INDIVIDUAL_ORDER, {idUser});

exports.getAllOrder = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_ORDER);

exports.addOrder = async (SQLConnection, obj) => SQLConnection.execute(sql.ADD_ORDER, obj, true);
