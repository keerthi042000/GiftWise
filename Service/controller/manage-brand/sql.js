exports.GET_ALL_BRAND = 'Select idBrand AS "idBrand", brandName AS "brandName" from brand';

exports.CHECK_BRAND_EXIST = 'SELECT COUNT(*) "isExist" FROM brand WHERE brandName = :brandName OR idBrand= :idBrand';

exports.UPDATE_BRAND = 'Update brand SET brandName= :brandName WHERE  idBrand = :idBrand';

exports.ADD_BRAND = 'INSERT INTO brand (brandName) VALUES (:brandName)';
