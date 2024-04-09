exports.GET_ALL_ORDER = `SELECT O.orderId AS "orderId",
O.idGiftcard AS "idGiftcard", 
O.status AS "status",
O.discount AS "discount",
O.totalAmount AS "totalAmount",
O.startDate AS "startDate",
O.endDate AS "endDate",
O.orderDatetime AS "orderDatetime",
G.giftCardNumber AS "giftCardNumber"
G.giftCardPin AS "giftCardPin"
G.status AS "giftCardStatus",
G.idProduct AS "idProduct",
P.productName AS "productName"
B.brandName AS "brandName",
C.categoryName AS "categoryName"
FROM Orders O
LEFT JOIN GiftCard G ON O.idGiftcard = G.idGiftcard
LEFT JOIN Product P ON P.idProduct = G.idProduct
LEFT JOIN Brand B ON B.idBrand = P.idBrand
LEFT JOIN Category C ON C.idCategory = P.idCategory`

exports.GET_INDIVIDUAL_ORDER = `SELECT O.orderId AS "orderId",
O.idGiftcard AS "idGiftcard", 
O.status AS "status",
O.discount AS "discount",
O.totalAmount AS "totalAmount",
O.startDate AS "startDate",
O.endDate AS "endDate",
O.orderDatetime AS "orderDatetime",
G.giftCardNumber AS "giftCardNumber"
G.giftCardPin AS "giftCardPin"
G.status AS "giftCardStatus",
G.idProduct AS "idProduct"
P.productName AS "productName"
FROM Orders O
LEFT JOIN GiftCard G ON O.idGiftcard = G.idGiftcard
LEFT JOIN Product P ON P.idProduct = G.idProduct
WHERE O.idUser = :idUser`

exports.ADD_ORDER = `INSERT INTO ORDERS (
    idUser,
    idGiftcard,
    status,
    discount,
    totalAmount,
    startDate,
    endDate,
    orderDatetime) VALUES (:idUser,:idGiftcard,:status,:discount,:totalAmount,:startDate,:endDate,:orderDatetime)`;

