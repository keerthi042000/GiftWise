const SQLServer = require('../../utils/db');
const sql = require('./sql');

const SQLConnection = new SQLServer();

exports.getAllCategory = () => SQLConnection.execute(sql.GET_ALL_CATEGORY);

exports.checkIfCategoryExist = (categoryObj) => SQLConnection.execute(sql.CHECK_CATEGORY_EXIST, categoryObj);

exports.addCategory = (categoryObj) => SQLConnection.execute(sql.ADD_CATEGORY, categoryObj, true);

exports.updateCategory = (categoryObj) => SQLConnection.execute(sql.UPDATE_CATEGORY, categoryObj, true);
