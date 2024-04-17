const sql = require('./sql');
exports.getOrder = async (SQLConnection , idUser) => SQLConnection.execute(sql.GET_INDIVIDUAL_ORDER, {idUser});

exports.getOrderbyOrderID = async (SQLConnection , orderID) => SQLConnection.execute(sql.GET_INDIVIDUAL_ORDER_BY_ORDERID, {orderID});

exports.getAllOrder = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_ORDER);

exports.addOrder = async (SQLConnection, obj) => SQLConnection.execute(sql.ADD_ORDER, obj, true );

exports.addProductOrder = async (SQLConnection, orderId, idGiftCard) => SQLConnection.execute(sql.ADD_PRODUCTORDER, {orderId, idGiftCard}, true );

exports.updateRewards = async (SQLConnection, idUser, rewardPoints) => SQLConnection.execute(sql.UPDATE_REWARDS, {idUser:idUser, points:rewardPoints}, true );

exports.insertRewardsHistory = async (SQLConnection, idUser, orderId) => SQLConnection.execute(sql.INSERT_REWARDSHISTORY, {idUser:idUser, orderId:orderId}, true );
