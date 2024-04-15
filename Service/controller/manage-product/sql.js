exports.GET_ALL_PRODUCT = `Select idProduct AS "idProduct",
idBrand AS "idBrand", 
idCategory AS "idCategory",
productName AS "productName", 
description AS "description", 
termsAndConditions AS "termsAndConditions", 
stepsToRedeem AS "stepsToRedeem", 
imageURL AS "imageURL", 
quantity AS "quantity" from product ORDER BY idProduct ASC`;

exports.GET_PRODUCT = `SELECT 
P.idProduct AS "idProduct",
P.idBrand AS "idBrand", 
P.idCategory AS "idCategory",
P.productName AS "productName", 
P.description AS "description", 
P.termsAndConditions AS "termsAndConditions", 
P.stepsToRedeem AS "stepsToRedeem", 
P.imageURL AS "imageURL", 
P.quantity AS "quantity",
COALESCE((SELECT discountInPercentage FROM Promocode P1 WHERE P1.idProduct = P.idProduct AND P1.isActive = 1), 0) AS "discountInPercentage",
COALESCE((SELECT promocode FROM Promocode P1 WHERE P1.idProduct = P.idProduct AND P1.isActive = 1), '') AS "promocode"
FROM 
product P
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
quantity AS "quantity" from product where idBrand = :id ORDER BY idProduct ASC`;

exports.GET_PRODUCT_BYCATEGORYID = `Select idProduct AS "idProduct",
idBrand AS "idBrand", 
idCategory AS "idCategory",
productName AS "productName", 
description AS "description", 
termsAndConditions AS "termsAndConditions", 
stepsToRedeem AS "stepsToRedeem", 
imageURL AS "imageURL", 
quantity AS "quantity" from product where idCategory = :id ORDER BY idProduct ASC`;

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
        :description,:termsAndConditions,:stepsToRedeem,:imageURL, :quantity)`;
