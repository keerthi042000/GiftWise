exports.GET_ALL_CATEGORY = `SELECT c.idCategory AS "idCategory",
c.categoryName AS "categoryName",
CASE WHEN EXISTS (SELECT 1 FROM Product WHERE idCategory = c.idCategory) THEN 1 ELSE 0 END AS "isLinked"
FROM Category c
ORDER BY c.idCategory ASC`;

exports.CHECK_CATEGORY_EXIST = 'SELECT COUNT(*) "isExist" FROM Category WHERE categoryName = :categoryName OR idCategory= :idCategory';

exports.UPDATE_CATEGORY = 'Update Category SET categoryName= :categoryName WHERE  idCategory = :idCategory';

exports.ADD_CATEGORY = 'INSERT INTO Category (categoryName) VALUES (:categoryName)';

exports.DELETE_CATEGORY = 'DELETE FROM Category where idCategory = :idCategory'