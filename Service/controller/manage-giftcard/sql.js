exports.GET_ALL_GIFTCARD = 'Select idGiftcard AS "idGiftcard",idProduct AS "idProduct", giftCardNumber AS "giftCardNumber", giftCardPin AS "giftCardPin", status AS "status" from giftcard';

exports.GET_GIFTCARD_BYPRODUCTID = 'Select idGiftcard AS "idGiftcard",idProduct AS "idProduct", giftCardNumber AS "giftCardNumber", giftCardPin AS "giftCardPin", status AS "status" from giftcard where idProduct = :idProduct';

exports.CHECK_GIFTCARD_EXIST = 'SELECT COUNT(*) "isExist" FROM giftcard WHERE idGiftcard = :idGiftcard';

exports.ADD_GIFTCARD = "INSERT INTO giftcard (idProduct, giftCardNumber, giftCardPin, status) VALUES (:idProduct, :giftCardNumber, :giftCardPin, :status)";

exports.ADD_GIFTCARD = 'Delete giftcard where idProduct=:idProduct';
