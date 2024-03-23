// Function to generate a random 16-digit number with dashes every 4 characters
function generate16DigitNumber() {
    let number = '';
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
            number += '-';
        }
        number += Math.floor(Math.random() * 10); // Random digit from 0 to 9
    }
    return number;
}

// Function to generate a random 6-digit gift card code
function generate6DigitGiftCardCode() {
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10); // Random digit from 0 to 9
    }
    return code;
}

// Function to generate multiple gift card codes
function generateGiftCardCodes(count, idProduct) {
    const giftCardCodes = [];
    for (let i = 0; i < count; i++) {
        const giftcardNumber = generate16DigitNumber();
        const giftCardPin = generate6DigitGiftCardCode();
        giftCardCodes.push({
            idProduct,
            giftcardNumber,
            giftCardPin,
            status: 'ACTIVE'
        });
    }
    return giftCardCodes;
}

exports.generateGiftCardCodes = generateGiftCardCodes;