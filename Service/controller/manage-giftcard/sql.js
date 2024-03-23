exports.GET_ALL_GIFTCARD = 'Select idGiftcard,idProduct, giftCardNumber, giftCardPin, status from giftcard';

exports.CHECK_GIFTCARD_EXIST = 'SELECT COUNT(*) "isExist" FROM giftcard WHERE idGiftcard = :idGiftcard';

exports.ADD_GIFTCARD = "INSERT INTO giftcard (idProduct, giftCardNumber, giftCardPin, status) VALUES (:idProduct, :giftCardNumber, :giftCardPin, :status)";

exports.ADD_GIFTCARD = 'Delete giftcard where idProduct=:idProduct';
