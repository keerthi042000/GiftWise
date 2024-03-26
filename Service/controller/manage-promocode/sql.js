exports.GET_ALL_PROMOCODE = 'Select idPromocode as "idPromocode", idProduct AS "idProduct", name AS "name", discountInPercentage AS "discountInPercentage", isActive AS "isActive" from Promocode ORDER BY idPromocode ASC';

exports.CHECK_PROMOCODE_EXIST = 'SELECT COUNT(*) "isExist" FROM Promocode WHERE (name = :name AND idProduct= :idProduct) OR idPromocode= :idPromocode';

exports.UPDATE_PROMOCODE = 'Update Promocode SET idProduct= :idProduct, name= :name, discountInPercentage = :discountInPercentage, isActive = :isActive WHERE  idPromocode = :idPromocode';

exports.ADD_PROMOCODE = 'INSERT INTO Promocode (idProduct, name, discountInPercentage, isActive) VALUES (:idProduct, :name, :discountInPercentage, :isActive)';

exports.DELETE_PROMOCODE = 'Delete from Promocode where idPromocode = :idPromocode';
