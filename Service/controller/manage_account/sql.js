
exports.IS_EMAIL_EXISTS = `Select userID idUser,emailID emailID, password from Users where emailID=:email`

exports.VERIFY_USER = `Select userID idUser,emailID emailID from Users where emailID=:email AND password=:password`

exports.getRoleID = `Select roleID roleid from Roles where isSuperAdmin=:isAdmin AND isCustomer=:isCustomer`

exports.CREATE_USER = `INSERT INTO Users (roleID, emailID, password, isActive, lastLogin) VALUES (:roleid, :email, :password, 1, SYSDATE) RETURNING userID INTO :out_userID`

exports.INSERT_CUSTOMER = `INSERT INTO Customer (userID, firstName, lastName, DOB, address, zipcode) VALUES (:userid, :firstname, :lastname, :dob, :address, :zipcode) RETURNING customerID INTO :out_customerID`

exports.INSERT_FAVOURITE = `INSERT INTO UserFavourites (userID) VALUES (:userid)`

exports.INSERT_PHONEDETAILS = `INSERT INTO CustomerPhoneDetails (customerID, phoneNumber, phoneType) VALUES (:customerid, :phone, :phonetype)`
