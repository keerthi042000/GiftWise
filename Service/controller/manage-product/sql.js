exports.GET_ALL_PRODUCT = 'Select * from product';

exports.CHECK_PRODUCT_EXIST = 'SELECT COUNT(*) isExist FROM product WHERE (brandId = :brandId AND categoryId= :categoryId AND productName= :productName) OR productId = :productId';

exports.UPDATE_PRODUCT = `UPDATE product 
SET 
    brandId = :brandId, 
    categoryId = :categoryId, 
    productName = :productName, 
    description = :description, 
    termsAndConditions = :termsAndConditions, 
    stepsToRedeem = :stepsToRedeem, imageURL = :imageURL WHERE productId = :productId`;

exports.ADD_PRODUCT = `INSERT INTO product (brandID, categoryID, productName,
    description,termsAndConditions,stepsToRedeem,imageURL ) VALUES (:brandId, :categoryId, :productName,
        :description,:termsAndConditions,:stepsToRedeem,:imageURL)`;
