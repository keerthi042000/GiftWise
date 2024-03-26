exports.GET_ALL_BRAND = `Select b.idBrand AS "idBrand", b.brandName AS "brandName", CASE WHEN EXISTS (SELECT 1 FROM Product WHERE idBrand = b.idBrand) THEN 1 ELSE 0 END AS "isLinked" from brand b
ORDER BY b.idBrand ASC`;

exports.CHECK_BRAND_EXIST = 'SELECT COUNT(*) "isExist" FROM brand WHERE brandName = :brandName OR idBrand= :idBrand';

exports.UPDATE_BRAND = 'Update brand SET brandName= :brandName WHERE  idBrand = :idBrand';

exports.ADD_BRAND = 'INSERT INTO brand (brandName) VALUES (:brandName)';

exports.DELETE_BRAND = 'DELETE FROM brand where idBrand = :idBrand'
