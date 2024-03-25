exports.GET_ALL_CATEGORY = 'Select idCategory AS "idCategory", categoryName as "categoryName"  from Category';

exports.CHECK_CATEGORY_EXIST = 'SELECT COUNT(*) "isExist" FROM Category WHERE categoryName = :categoryName OR categoryId= :categoryId';

exports.UPDATE_CATEGORY = 'Update Category SET categoryName= :categoryName WHERE  categoryId = :categoryId';

exports.ADD_CATEGORY = 'INSERT INTO Category (categoryName) VALUES (:categoryName)';
