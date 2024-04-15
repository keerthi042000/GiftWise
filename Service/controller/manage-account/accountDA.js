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

exports.checkLockedAccount = async (connection, idUser) => {
  const result = await connection.execute(sql.CHECK_LOGINATTEMPTS, { idUser });
  const [result1] = result.rows;
  const loginAttempts = result1[1];
  const lastLockTime = new Date(result1[2]);

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  if (loginAttempts > 3 && lastLockTime > twentyFourHoursAgo) {
    return true;
  }
  return false;
};

exports.updateLoginAttempts = async (connection, idUser) => {
  const result = await connection.execute(sql.UPDATE_LOGINATTEMPTS, { idUser });
  return result.rows;
};

exports.resetLoginAttempts = async (connection, idUser) => {
  const result = await connection.execute(sql.RESET_LOGINATTEMPTS, { idUser });
  const result1 = await connection.execute(sql.UPDATE_LASTLOGIN, { idUser });
  return result.rows;
};

exports.getRoleID = async (connection, isSuperAdmin, isCustomer) => {
  const result = await connection.execute(sql.GET_ID_ROLE, { isSuperAdmin, isCustomer });
  return result.rows[0]
};

exports.createUser = async (connection, idRole, emailId, password) => {
  const result = await connection.execute(sql.CREATE_USER, { idRole, emailId, password, out_userId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } });
  const [userId] = result.outBinds.out_userId;
  await connection.execute(sql.INSERT_LOGINATTEMPTS, { idUser : userId });
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


exports.getCustomerDetails = async(SQLConnection, obj) => SQLConnection.execute(sql.FETCH_CUSTOMERDETAILS, obj);

exports.updateDetails = async (connection, idUser, data, queryName) => {
  const queries = {
    updateUser: sql.UPDATE_USERDETAILS,
    updateCustomer: sql.UPDATE_CUSTOMERDETAILS,
    updatePhone: sql.UPDATE_PHONEDETAILS,
  };
  const columnsToUpdate = Object.keys(data);
  const queryValues = Object.values(data);
  const updateValues = columnsToUpdate.map((col, index) => `${col} = :val${index+1}`).join(', ');
  const bindParams = {};
  columnsToUpdate.forEach((col, index) => {
    bindParams[`val${index+1}`] = queryValues[index];
  });
  bindParams.idUser = idUser;
  const sqlQuery = queries[queryName].replace(':updateValues', updateValues);
  const result = await connection.execute(sqlQuery, bindParams);
  return result.rowsAffected;
};