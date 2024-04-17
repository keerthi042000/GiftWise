exports.GET_ALL_FAV = `
Select 
U.idUser AS "idUser",
P.idProduct AS "idProduct",
P.productName AS "productName",
P.description AS "description",
P.termsAndConditions AS "termsAndConditions",
P.stepsToRedeem AS "stepsToRedeem",
P.imageURL AS "imageURL",
P.quantity AS "quantity",
P.amount AS "amount"
from UserFavourites U left join Product P ON U.idProduct = P.idProduct where U.idUser = :idUser`;

exports.DELETE_FAV_BYPRODUCT = `Delete from UserFavourites where idUser = :idUser and idProduct = :idProduct`;

exports.INSERT_FAV = `INSERT INTO UserFavourites (idUser, idProduct) VALUES (:idUser, :idProduct)`