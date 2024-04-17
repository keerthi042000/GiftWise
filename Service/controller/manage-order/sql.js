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

exports.GET_INDIVIDUAL_ORDER = `SELECT 
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
Category C ON C.idCategory = P.idCategory WHERE O.idUser = :idUser 
GROUP BY 
O.orderId, 
O.status,
O.discount,
O.totalAmount,
O.startDate,
O.endDate,
O.orderDatetime  ORDER BY O.orderId DESC`

exports.GET_INDIVIDUAL_ORDER_BY_ORDERID = `SELECT 
O.orderId AS "orderId",
O.status AS "status",
O.discount AS "discount",
O.totalAmount AS "totalAmount",
O.startDate AS "startDate",
O.endDate AS "endDate",
O.orderDatetime AS "orderDatetime",
PM.paymentMethod AS "paymentMethod",
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
LEFT JOIN TRANSACTION T ON O.orderId = T.orderId
LEFT JOIN PaymentMethod PM ON T.idPaymentMethod = PM.idPaymentMethod WHERE O.orderId = :orderId
GROUP BY 
O.orderId, 
O.status,
O.discount,
O.totalAmount,
O.startDate,
O.endDate,
O.orderDatetime,
PM.paymentMethod`


exports.ADD_ORDER = `INSERT INTO ORDERS (
    idUser,
    status,
    discount,
    totalAmount,
    startDate,
    endDate,
    orderDatetime) VALUES (:idUser, :status, :discount, :totalAmount, CURRENT_DATE, ADD_MONTHS(CURRENT_DATE, 12), CURRENT_DATE)
    RETURNING orderId INTO :out_orderId`;


exports.ADD_PRODUCTORDER = `INSERT INTO ProductOrders (
    orderId,
    idGiftcard) VALUES (:orderId, :idGiftCard)`;
    
exports.UPDATE_REWARDS = `UPDATE UserRewards set points = :points where idUser=:idUser`;
    
exports.INSERT_REWARDSHISTORY = `INSERT INTO UserRewardsHistory (
    idReward,
    orderId,
    points,
    modifiedDatetime
)
SELECT idReward, :orderId, points, SYSDATE
FROM UserRewards
WHERE idUser = :idUser`;

exports.INSERT_TRANSACTION = `INSERT INTO Transaction (
    idUser,
    orderId,
    idPaymentMethod,
    status,
    amount,
    transactionDatetime) VALUES (:idUser, :orderId, :idPaymentMethod, :status, :amount, SYSDATE)`
