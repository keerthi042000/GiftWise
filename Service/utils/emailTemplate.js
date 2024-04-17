

exports.getTemplate = (giftcardNumber, giftcardPin, amount, imageURL) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gift Card</title>
        <style>
            .d-flex.justify-content-end {
  display: flex;
  justify-content: flex-end;
}
        </style>
    </head>

    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
        <tr>
            <td bgcolor="#f8f8f8" style="padding: 40px 20px;">
                <h2 style="margin: 0; color: #333;">You've Received a Gift Card!</h2>
            </td>
        </tr>
        <tr>
            <td bgcolor="#ffffff" style="padding: 20px;">
                <p style="margin: 0; color: #333;">Dear Customer,</p>
                <p style="margin: 20px 0; color: #333;">We hope this message finds you well! We're thrilled to inform you that you've received a special gift.</p>
                <p style="margin: 20px 0; color: #333;">Your gift card details are provided below:</p>
                <div class="row">
                    <div class="col-md-6">
                      <div class="col-md-6 d-flex justify-content-end">
                      <img src="${imageURL}" style="width: 40%;height: 40%;" class="img-fluid" alt="Your Image">
                        <div>
                          <ul style="margin: 20px 0; padding: 0; color: #333;">
                              Gift Card Number: ${giftcardNumber} </br>
                              Pin: ${giftcardPin} </br>
                              Amount: $${amount} </br>
                          </ul>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                
                <p style="margin: 20px 0; color: #333;"></p>
                <p style="margin: 20px 0; color: #333;">Thank you for being a valued Giftwise customer! We hope you enjoy your gift and find something special to treat yourself with.</p>
                <p style="margin: 20px 0; color: #333;">Best wishes,<br>Team Giftwise</p>
            </td>
        </tr>
    </table>
    
    </body>
    </html>`
}