// Function to generate a random gift card number
function generateGiftCardNumber() {
    let number = '';
    for (let i = 0; i < 16; i++) {
        if (i % 5 === 4) {
            number += '-';
        } else {
            number += Math.floor(Math.random() * 10);
        }
    }
    return number;
}
let giftcardNumber = []
// Function to generate a random 6-digit pin
function generateGiftCardPin() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate 100 insert queries
function generateInsertQueries() {
    let queries = [];
    for (let i = 0; i < 100; i++) {
        let giftCardNumber = generateGiftCardNumber();
        let giftCardPin = generateGiftCardPin();
        if(giftcardNumber.includes(giftCardNumber))
            {
                 giftCardNumber = generateGiftCardNumber();
            }
        giftcardNumber.push(giftCardNumber)
        let query = `INSERT INTO GiftCard (IDPRODUCT, GIFTCARDNUMBER, GIFTCARDPIN, STATUS) VALUES (1, '${giftCardNumber}', '${giftCardPin}', 'Inactive');`;
        queries.push(query);
    }
    return queries;
}

// Print the insert queries
require('fs').writeFileSync('./GiftCardSQLQuery.sql', generateInsertQueries().join("\n"))



// INSERT INTO ORDERS VALUES (1, 1,'Pending',10, 90, '13/04/24', '13/04/25', SYSDATE);

// INSERT INTO ProductOrders  VALUES (1,2);
// INSERT INTO ProductOrders VALUES (1,3);

// Update giftcard SET status='active' where idGiftcard= 2; 
// Update giftcard SET status='active' where idGiftcard= 3;