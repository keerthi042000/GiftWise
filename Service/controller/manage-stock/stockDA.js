const mysql = require('../../utils/db');
const sql = require('./sql');

exports.getAllStockValue = () => mysql.query(sql.GET_UPDATED_VALUE);

exports.verifyUser = (user,password) => mysql.query(sql.VERIFY_USER,[user,password])

exports.saveStockValue = (idStock,value) => mysql.query(sql.SAVE_STOCK_VALUE,[idStock,value])

exports.getStockValue = () => mysql.query(sql.GET_LIST_OF_STOCK_VALUE)

exports.checkUserWriteAccess = (idUser,idStock) => mysql.query(sql.CHECK_USER_WRITE_ACCESS,[idUser,idStock])

exports.getListOfStock =(idUser)=> mysql.query(sql.GET_LIST_OF_STOCK,[idUser])
//Extra

exports.getAllStockTransaction = (idStock,value) => mysql.query(sql.GET_ALL_STOCK_Transaction)

exports.getAllUser = () => mysql.query(sql.GET_ALL_USER)

exports.getAllSystemAttributes = (idUser,idStock) => mysql.query(sql.GET_ALL_SYSTEM_ATTRIBUTE)

exports.getAllUserGrants = (idUser,idStock) => mysql.query(sql.GET_ALL_USER_GRANTS)