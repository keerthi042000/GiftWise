exports.GET_ALL_PROMOCODE = 'Select * from Promocode';

exports.CHECK_PROMOCODE_EXIST = 'SELECT COUNT(*) isExist FROM Promocode WHERE (name = :name AND productID= :productID) OR promocodeId= :promocodeId';

exports.UPDATE_PROMOCODE = 'Update Promocode SET productId= :productId, name= :name, discountInPercentage = :discountInPercentage WHERE  promocodeId = :promocodeId';

exports.ADD_PROMOCODE = 'INSERT INTO Promocode (productID, name, discountInPercentage) VALUES (:productId, :name, :discountInPercentage)';
