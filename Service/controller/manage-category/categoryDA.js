const sql = require('./sql');

exports.getAllCategory = async (SQLConnection) => SQLConnection.execute(sql.GET_ALL_CATEGORY);

exports.checkIfCategoryExist = async (SQLConnection, categoryObj) => SQLConnection.execute(sql.CHECK_CATEGORY_EXIST, categoryObj);

exports.addCategory = async (SQLConnection, categoryObj) => SQLConnection.execute(sql.ADD_CATEGORY, categoryObj, true);

exports.updateCategory = async (SQLConnection, categoryObj) => SQLConnection.execute(sql.UPDATE_CATEGORY, categoryObj, true);

exports.deleteCategory = async (SQLConnection, obj) => SQLConnection.execute(sql.DELETE_CATEGORY, obj, true);
