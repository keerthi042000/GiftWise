exports.GET_ALL_PRODUCT = 'Select idProduct AS "idProduct",idBrand AS "idBrand", idCategory AS "idCategory",productName AS "productName", description AS "description", termsAndConditions AS "termsAndConditions", stepsToRedeem AS "stepsToRedeem", imageURL AS "imageURL", quantity AS "quantity" from product';

exports.CHECK_PRODUCT_EXIST = 'SELECT COUNT(*) "isExist" FROM product WHERE (idBrand = :idBrand AND idCategory= :idCategory AND productName= :productName) OR idProduct = :idProduct';

exports.UPDATE_PRODUCT = `UPDATE product 
SET 
    idBrand = :idBrand, 
    idCategory = :idCategory, 
    productName = :productName, 
    description = :description, 
    termsAndConditions = :termsAndConditions, 
    stepsToRedeem = :stepsToRedeem, 
    imageURL = :imageURL 
    quantity = :quantity WHERE idProduct = :idProduct`;

exports.ADD_PRODUCT = `INSERT INTO product (idBrand, idCategory, productName,
    description,termsAndConditions,stepsToRedeem,imageURL ) VALUES (:idBrand, :idCategory, :productName,
        :description,:termsAndConditions,:stepsToRedeem,:imageURL)`;
