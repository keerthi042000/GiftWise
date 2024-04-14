exports.GET_ALL_ORDER = `SELECT 
O.orderId AS "orderId",
O.status AS "status",
O.discount AS "discount",
O.totalAmount AS "totalAmount",
O.startDate AS "startDate",
O.endDate AS "endDate",
O.orderDatetime AS "orderDatetime",
LISTAGG(DISTINCT G.giftCardNumber, ',') WITHIN GROUP (ORDER BY G.idGiftcard) AS "giftCardNumber",
LISTAGG(DISTINCT G.giftCardPin, ',') WITHIN GROUP (ORDER BY G.idGiftcard) AS "giftCardPin",
LISTAGG(G.status, ',') WITHIN GROUP (ORDER BY G.idGiftcard) AS "giftCardStatus",
LISTAGG(DISTINCT G.idProduct, ',') WITHIN GROUP (ORDER BY G.idGiftcard) AS "idProduct",
LISTAGG(DISTINCT P.productName, ',') WITHIN GROUP (ORDER BY G.idGiftcard) AS "productName",
LISTAGG(DISTINCT B.brandName, ',') WITHIN GROUP (ORDER BY G.idGiftcard) AS "brandName",
LISTAGG(DISTINCT C.categoryName, ',') WITHIN GROUP (ORDER BY G.idGiftcard) AS "categoryName"
FROM 
Orders O
INNER JOIN 
ProductOrders PO ON PO.orderId = O.orderId
INNER JOIN 
GiftCard G ON G.idGiftcard = PO.idGiftcard
INNER JOIN 
Product P ON P.idProduct = G.idProduct
INNER JOIN 
Brand B ON B.idBrand = P.idBrand
INNER JOIN 
Category C ON C.idCategory = P.idCategory
GROUP BY 
O.orderId, 
O.status,
O.discount,
O.totalAmount,
O.startDate,
O.endDate,
O.orderDatetime`

exports.GET_INDIVIDUAL_ORDER = `SELECT O.orderId AS "orderId",
O.idGiftcard AS "idGiftcard", 
O.status AS "status",
O.discount AS "discount",
O.totalAmount AS "totalAmount",
O.startDate AS "startDate",
O.endDate AS "endDate",
O.orderDatetime AS "orderDatetime",
G.giftCardNumber AS "giftCardNumber",
G.giftCardPin AS "giftCardPin",
G.status AS "giftCardStatus",
G.idProduct AS "idProduct",
P.productName AS "productName"
FROM Orders O
LEFT JOIN GiftCard G ON O.idGiftcard = G.idGiftcard
LEFT JOIN Product P ON P.idProduct = G.idProduct
WHERE O.idUser = :idUser`

exports.GET_INDIVIDUAL_ORDER_BY_ORDERID = `SELECT O.orderId AS "orderId",
O.idGiftcard AS "idGiftcard", 
O.status AS "status",
O.discount AS "discount",
O.totalAmount AS "totalAmount",
O.startDate AS "startDate",
O.endDate AS "endDate",
O.orderDatetime AS "orderDatetime",
G.giftCardNumber AS "giftCardNumber",
G.giftCardPin AS "giftCardPin",
G.status AS "giftCardStatus",
G.idProduct AS "idProduct",
P.productName AS "productName"
FROM Orders O
LEFT JOIN GiftCard G ON O.idGiftcard = G.idGiftcard
LEFT JOIN Product P ON P.idProduct = G.idProduct
WHERE O.orderId = :orderId`


exports.ADD_ORDER = `INSERT INTO ORDERS (
    idUser,
    idGiftcard,
    status,
    discount,
    totalAmount,
    startDate,
    endDate,
    orderDatetime) VALUES (:idUser,:idGiftcard,:status,:discount,:totalAmount,:startDate,:endDate,:orderDatetime)`;

