exports.GET_ALL_PRODUCT = `Select idProduct AS "idProduct",
idBrand AS "idBrand", 
idCategory AS "idCategory",
productName AS "productName", 
description AS "description", 
termsAndConditions AS "termsAndConditions", 
stepsToRedeem AS "stepsToRedeem", 
imageURL AS "imageURL", 
amount AS "amount",
quantity AS "quantity" from product ORDER BY idProduct ASC`;

exports.GET_PRODUCT = `SELECT 
P.idProduct AS "idProduct",
P.idBrand AS "idBrand", 
B.brandName AS "brandName",
P.idCategory AS "idCategory",
P.productName AS "productName", 
P.description AS "description", 
P.termsAndConditions AS "termsAndConditions", 
P.stepsToRedeem AS "stepsToRedeem", 
P.imageURL AS "imageURL", 
P.quantity AS "quantity",
P.amount AS "amount"
FROM 
product P
JOIN brand B ON B.idBrand = P.idBrand
WHERE 
P.idProduct = :idProduct`;

exports.GET_PRODUCT_BYBRANDID = `Select idProduct AS "idProduct",
idBrand AS "idBrand", 
idCategory AS "idCategory",
productName AS "productName", 
description AS "description", 
termsAndConditions AS "termsAndConditions", 
stepsToRedeem AS "stepsToRedeem", 
imageURL AS "imageURL", 
amount AS "amount",
quantity AS "quantity" from product where idBrand = :idBrand ORDER BY idProduct ASC`;

exports.GET_PRODUCT_BYCATEGORYID = `Select idProduct AS "idProduct",
idBrand AS "idBrand", 
idCategory AS "idCategory",
productName AS "productName", 
description AS "description", 
termsAndConditions AS "termsAndConditions", 
stepsToRedeem AS "stepsToRedeem", 
imageURL AS "imageURL", 
amount AS "amount",
quantity AS "quantity" from product where idCategory = :idCategory ORDER BY idProduct ASC`;

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
    quantity = :quantity
    isDelete = :isDelete WHERE idProduct = :idProduct`;

exports.ADD_PRODUCT = `INSERT INTO product (idBrand, idCategory, productName,
    description,termsAndConditions,stepsToRedeem,imageURL, quantity ) VALUES (:idBrand, :idCategory, :productName,
        :description,:termsAndConditions,:stepsToRedeem,:imageURL, :quantity, :amount)`;

exports.DELETE_PRODUCT = `DELETE FROM Product where idProduct = :idProduct`
