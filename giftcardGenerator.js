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
function generateInsertQueries(count, idProduct) {
    let queries = [];
    for (let i = 0; i < count; i++) {
        let giftCardNumber = generateGiftCardNumber();
        let giftCardPin = generateGiftCardPin();
        if(giftcardNumber.includes(giftCardNumber))
            {
                 giftCardNumber = generateGiftCardNumber();
            }
        giftcardNumber.push(giftCardNumber)
        let query = `INSERT INTO GiftCard (IDPRODUCT, GIFTCARDNUMBER, GIFTCARDPIN, STATUS) VALUES (${idProduct}, '${giftCardNumber}', '${giftCardPin}', 'Inactive');`;
        queries.push(query);
    }
    return queries;
}

// Print the insert queries

let prod = {
    // '1': 100,
    // '2': 10,
    // '3': 20,
    // '4': 10,
    // '5': 100,
    // '6': 50,
    // '7': 20,
    // '8': 10,
    // '9': 25,
    '10': 50
}

const result  = Object.keys(prod).map(va=>{
    return generateInsertQueries(prod[va], va).join("\n")
})


require('fs').writeFileSync('./GiftCardSQLQuery-Product.sql', result.join("\n"))