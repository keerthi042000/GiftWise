exports.GET_ALL_PROMOCODE = 'Select idPromocode as "idPromocode", idProduct AS "idProduct", name AS "name", discountInPercentage AS "discountInPercentage" from Promocode';

exports.CHECK_PROMOCODE_EXIST = 'SELECT COUNT(*) "isExist" FROM Promocode WHERE (name = :name AND idProduct= :idProduct) OR promocodeId= :promocodeId';

exports.UPDATE_PROMOCODE = 'Update Promocode SET idProduct= :idProduct, name= :name, discountInPercentage = :discountInPercentage WHERE  promocodeId = :promocodeId';

exports.ADD_PROMOCODE = 'INSERT INTO Promocode (idProduct, name, discountInPercentage) VALUES (:idProduct, :name, :discountInPercentage)';
