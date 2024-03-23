
exports.GET_UPDATED_VALUE = `SELECT 
  st.id_stock,
  sa.name,
  value,
  last_updated
FROM stock_transaction st
  INNER JOIN (
    SELECT id_stock, MAX(last_updated) AS lastUpdated FROM stock_transaction GROUP BY id_stock
  ) ms ON st.id_stock = ms.id_stock AND last_updated = lastUpdated
  INNER JOIN system_attribute sa ON sa.id_attribute= st.id_stock`

exports.GET_LIST_OF_STOCK_VALUE =`SELECT st.id_stock idStock, sa.name, value, last_updated lastUpdated FROM stock_transaction st INNER JOIN ( SELECT id_stock, MAX(last_updated) AS lastUpdated FROM stock_transaction GROUP BY id_stock ) ms ON st.id_stock = ms.id_stock INNER JOIN system_attribute sa ON sa.id_attribute= ms.id_stock AND last_updated = lastUpdated AND TIME_TO_SEC(TIMEDIFF(NOW(),lastUpdated)) > 30`

exports.IS_EMAIL_EXISTS = `Select userID idUser,emailID emailID, password from Users where emailID=:email`

exports.VERIFY_USER = `Select userID idUser,emailID emailID from Users where emailID=:email AND password=:password`

exports.getRoleID = `Select roleID roleid from Roles where isSuperAdmin=:isAdmin AND isCustomer=:isCustomer`

exports.CREATE_USER = `INSERT INTO Users (roleID, emailID, password, isActive, lastLogin) VALUES (:roleid, :email, :password, 1, SYSDATE) RETURNING userID INTO :out_userID`

exports.INSERT_CUSTOMER = `INSERT INTO Customer (userID, firstName, lastName, DOB, address, zipcode) VALUES (:userid, :firstname, :lastname, :dob, :address, :zipcode) RETURNING customerID INTO :out_customerID`

exports.INSERT_FAVOURITE = `INSERT INTO UserFavourites (userID) VALUES (:userid)`

exports.INSERT_PHONEDETAILS = `INSERT INTO CustomerPhoneDetails (customerID, phoneNumber, phoneType) VALUES (:customerid, :phone, :phonetype)`

exports.SAVE_STOCK_VALUE = `INSERT INTO stock_transaction (id_stock, value,last_updated) VALUES (?, ?, NOW());`

exports.CHECK_USER_WRITE_ACCESS = `Select * from user_grants where id_user=? AND id_stock=? AND grant_name='WRITE'`

exports.GET_LIST_OF_STOCK = `SELECT DISTINCT st.*,sa.name FROM stock_transaction st 
INNER JOIN system_attribute sa ON sa.id_attribute= st.id_stock 
INNER JOIN user_grants ug ON ug.id_stock = sa.id_attribute 
INNER JOIN system_user su ON su.id_user = ug.id_user
where su.id_user=?
ORDER BY last_updated DESC LIMIT 5`


exports.GET_ALL_STOCK_Transaction = `Select * from stock_transaction ORDER BY last_updated DESC`
exports.GET_ALL_USER = `Select * from system_user`
exports.GET_ALL_SYSTEM_ATTRIBUTE = `Select * from system_attribute`
exports.GET_ALL_USER_GRANTS = `Select * from user_grants`
