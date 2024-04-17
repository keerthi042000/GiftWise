const giftcardDA = require('./giftcardDA');
const { httpUtil } = require('../../utils');
const { generateGiftCardCodes } = require('./util');

exports.getAllGiftcard = async (_, res) => { 
  const idProduct = _.query.idProduct;
  if (idProduct){
    console.log("inside get gift card");
    const data = await giftcardDA.getGiftcardByProductID(instanceOfSQLServer, idProduct);
    if (data.length){
      await giftcardDA.updateGiftCardStatusByID(instanceOfSQLServer, data[0].idGiftcard);
      return res.json(httpUtil.getSuccess(data));
    }
    else{
      return res.json(httpUtil.getException([null, 'No Gift Cards available']))
    }
  }
  const data = await giftcardDA.getAllGiftcard(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));
};

exports.addGiftcard = async (req, res,) => {
  const { idProduct, noOfOffers } = req.body;
  const giftCardArr = generateGiftCardCodes(instanceOfSQLServer, noOfOffers, idProduct)
    await giftcardDA.addGiftcard(instanceOfSQLServer, giftCardArr);
    return res.json(httpUtil.getSuccess());
};
