const sql = require('./sql');
const oracledb = require('oracledb');
const  { customException } = require('../../utils')


exports.verifyUserName = async (connection, email_id) => {
  const result = await connection.execute(sql.IS_EMAIL_EXISTS, {email:email_id});
  return result.rows;
};
 
exports.verifyUser = async (connection, email_id, password) => {
  const result = await connection.execute(sql.VERIFY_USER, {email:email_id, password:password});
  return result.rows;
};

exports.getRoleID = async (connection, isAdmin, isCustomer) => {
  const result = await connection.execute(sql.getRoleID, {isAdmin:isAdmin, isCustomer:isCustomer});
  roleid = result.rows[0]
  if (!roleid) {
    return res.status(400).send('No Roles found');
  }
  return roleid;
};

exports.createUser = async (connection, roleid, email_id, password, firstname, lastname, dob, address, zipcode, phone, phonetype) => {
  const result = await connection.execute(sql.CREATE_USER, {roleid:roleid, email:email_id, password:password, out_userID: { type: oracledb.STRING, dir: oracledb.BIND_OUT}});
  const userId = result.outBinds.out_userID;
  if (!userId[0]) {
    return res.status(400).send('User not created');
  }
  await this.InsertCustomer(connection, userId[0], firstname, lastname, dob, address, zipcode, phone, phonetype);
  await this.InserFavourite(connection, userId[0]);
  return userId[0];
};

exports.InsertCustomer = async (connection, userid, firstname, lastname, dob, address, zipcode, phone, phonetype) => {
  const result = await connection.execute(sql.INSERT_CUSTOMER, {userid:userid, firstname:firstname, lastname:lastname, dob:dob, address:address, zipcode:zipcode, out_customerID: { type: oracledb.STRING, dir: oracledb.BIND_OUT}});
  const customerId = result.outBinds.out_customerID;
  await this.InsertPhoneDetails(connection, customerId[0],phone,phonetype);
  return customerId[0];
};

exports.InserFavourite = async (connection, userid) => {
  const result = await connection.execute(sql.INSERT_FAVOURITE, {userid:userid});
  return result.rowsAffected;;
};


exports.InsertPhoneDetails = async (connection, customerid, phone, phonetype) => {
  const result = await connection.execute(sql.INSERT_PHONEDETAILS, {customerid:customerid, phone:phone, phonetype:phonetype});
  return result.rowsAffected;
};