const sql = require('./sql');
const oracledb = require('oracledb');

exports.verifyUserName = async (connection, emailId) => {
  const result = await connection.execute(sql.IS_EMAIL_EXISTS, { emailId });
  return result.rows;
};

exports.verifyUser = async (connection, emailId, password) => {
  const result = await connection.execute(sql.VERIFY_USER, { emailId, password });
  return result.rows;
};

exports.getRoleID = async (connection, isSuperAdmin, isCustomer) => {
  const result = await connection.execute(sql.GET_ID_ROLE, { isSuperAdmin, isCustomer });
  return result.rows[0]
};

exports.createUser = async (connection, idRole, emailId, password) => {
  const result = await connection.execute(sql.CREATE_USER, { idRole, emailId, password, out_userId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } });
  const [userId] = result.outBinds.out_userId;
  return userId;
};

exports.InsertCustomer = async (connection, idUser, firstName, lastName, dob, address, zipcode, phone, phoneType) => {
  const result = await connection.execute(sql.INSERT_CUSTOMER, { idUser, firstName, lastName, dob, address, zipcode, out_customerId: { type: oracledb.STRING, dir: oracledb.BIND_OUT } });
  const [customerId] = result.outBinds.out_customerId;
  await this.InsertPhoneDetails(connection, customerId, phone, phoneType);
  return customerId;
};

exports.InserFavourite = async (connection, idUser) => {
  const result = await connection.execute(sql.INSERT_FAVOURITE, { idUser: idUser });
  return result.rowsAffected;
};


exports.InsertPhoneDetails = async (connection, idCustomer, phone, phoneType) => {
  const result = await connection.execute(sql.INSERT_PHONEDETAILS, { idCustomer, phone, phoneType });
  return result.rowsAffected;
};