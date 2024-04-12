
exports.IS_EMAIL_EXISTS = `Select idUser, emailId, password from Users where emailId=:emailId`

exports.VERIFY_USER = `Select idUser,emailId from Users where emailId=:emailId AND password=:password`

exports.GET_ID_ROLE = `Select idRole from Roles where isSuperAdmin=:isSuperAdmin AND isCustomer=:isCustomer`

exports.CREATE_USER = `INSERT INTO Users (idRole, emailId, password, isActive, lastLogin) VALUES (:idRole, :emailId, :password, 1, SYSDATE) RETURNING idUser INTO :out_userId`

exports.INSERT_CUSTOMER = `INSERT INTO Customer (idUser, firstName, lastName, DOB, address, zipcode) VALUES (:idUser, :firstName, :lastName, :dob, :address, :zipcode) RETURNING idCustomer INTO :out_customerId`

exports.INSERT_FAVOURITE = `INSERT INTO UserFavourites (idUser) VALUES (:idUser)`

exports.INSERT_PHONEDETAILS = `INSERT INTO CustomerPhoneDetails (idCustomer, phoneNumber, phoneType) VALUES (:idCustomer, :phone, :phoneType)`

exports.FETCH_CUSTOMERDETAILS = `Select * from Users join Customer using(idUser) join CustomerPhoneDetails using(idCustomer)  where idUser=:idUser`

exports.UPDATE_USERDETAILS = `UPDATE Users set :updateValues where idUser = :idUser`

exports.UPDATE_CUSTOMERDETAILS = `UPDATE Customer set :updateValues where idUser = :idUser`

exports.UPDATE_PHONEDETAILS = `UPDATE CustomerPhoneDetails SET :updateValues where idCustomer = (select idCustomer from Customer where idUser = :idUser)`
