exports.GET_ALL_BRAND = 'Select * from brand';

exports.CHECK_BRAND_EXIST = 'SELECT COUNT(*) isExist FROM brand WHERE brandName = :brandName OR brandId= :brandId';

exports.UPDATE_BRAND = 'Update brand SET brandName= :brandName WHERE  brandId = :brandId';

exports.ADD_BRAND = 'INSERT INTO brand (brandName) VALUES (:brandName)';
