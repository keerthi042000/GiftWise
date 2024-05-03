const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate')
// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'vrevankar@wpi.edu', // Your Outlook email address
        pass: '' // Your Outlook password or application-specific password
    }
});

exports.sendMail = (email, giftcardNumber, giftcardPin, amount, imageURL) => {
    // Email message options
    let mailOptions = {
        from: 'vrevankar@wpi.edu', // Sender address
        to: email, // List of recipients
        subject: 'Gift Card', // Subject line
        html: emailTemplate.getTemplate(giftcardNumber, giftcardPin, amount, imageURL) // Plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

