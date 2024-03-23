const SQLServer = require('../../utils/db');
const sql = require('./sql');
const oracledb = require('oracledb');
const  { customException } = require('../../utils')


// exports.getAllStockValue = () => mysql.query(sql.GET_UPDATED_VALUE);



exports.verifyUserName = async (connection, email_id) => {
  try {
    const result = await connection.execute(sql.IS_EMAIL_EXISTS, {email:email_id});
    return result.rows;
  } catch (error) {
    console.error('Error in verifyUser:', error);
    throw error;
  }
};
 
exports.verifyUser = async (connection, email_id, password) => {
  try {
    const result = await connection.execute(sql.VERIFY_USER, {email:email_id, password:password});
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.getRoleID = async (connection, isAdmin, isCustomer) => {
  try {
    const result = await connection.execute(sql.getRoleID, {isAdmin:isAdmin, isCustomer:isCustomer});
    roleid = result.rows[0]
    if (!roleid) {
      throw new customException('No Roles found');
    }
    return roleid;
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (connection, roleid, email_id, password, firstname, lastname, dob, address, zipcode, phone, phonetype) => {
  try {
    const result = await connection.execute(sql.CREATE_USER, {roleid:roleid, email:email_id, password:password, out_userID: { type: oracledb.STRING, dir: oracledb.BIND_OUT}});
    const userId = result.outBinds.out_userID;
    if (!userId[0]) {
      throw customException('User not created');
    }
    await this.InsertCustomer(connection, userId[0], firstname, lastname, dob, address, zipcode, phone, phonetype);
    await this.InserFavourite(connection, userId[0]);
    return userId[0];
  } catch (error) {
    throw error;
  }
};

exports.InsertCustomer = async (connection, userid, firstname, lastname, dob, address, zipcode, phone, phonetype) => {
  try {
    const result = await connection.execute(sql.INSERT_CUSTOMER, {userid:userid, firstname:firstname, lastname:lastname, dob:dob, address:address, zipcode:zipcode, out_customerID: { type: oracledb.STRING, dir: oracledb.BIND_OUT}});
    const customerId = result.outBinds.out_customerID;
    await this.InsertPhoneDetails(connection, customerId[0],phone,phonetype);
    return customerId[0];
  } catch (error) {
    throw error;
  }
};

exports.InserFavourite = async (connection, userid) => {
  try {
    const result = await connection.execute(sql.INSERT_FAVOURITE, {userid:userid});
    return result.rowsAffected;;
  } catch (error) {
    throw error;
  }
};


exports.InsertPhoneDetails = async (connection, customerid, phone, phonetype) => {
  try {
    const result = await connection.execute(sql.INSERT_PHONEDETAILS, {customerid:customerid, phone:phone, phonetype:phonetype});
    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};


// exports.saveStockValue = (idStock,value) => mysql.query(sql.SAVE_STOCK_VALUE,[idStock,value])

// exports.getStockValue = () => mysql.query(sql.GET_LIST_OF_STOCK_VALUE)

// exports.checkUserWriteAccess = (idUser,idStock) => mysql.query(sql.CHECK_USER_WRITE_ACCESS,[idUser,idStock])

// exports.getListOfStock =(idUser)=> mysql.query(sql.GET_LIST_OF_STOCK,[idUser])
// //Extra

// exports.getAllStockTransaction = (idStock,value) => mysql.query(sql.GET_ALL_STOCK_Transaction)

// exports.getAllUser = () => mysql.query(sql.GET_ALL_USER)

// exports.getAllSystemAttributes = (idUser,idStock) => mysql.query(sql.GET_ALL_SYSTEM_ATTRIBUTE)

// exports.getAllUserGrants = (idUser,idStock) => mysql.query(sql.GET_ALL_USER_GRANTS)