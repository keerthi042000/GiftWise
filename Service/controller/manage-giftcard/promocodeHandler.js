const giftcardDA = require('./giftcardDA');
const { httpUtil } = require('../../utils');
const { generateGiftCardCodes } = require('./util');

exports.getGiftcard = async (_, res) => { 
  const data = await giftcardDA.getAllGiftcard();
  return res.json(httpUtil.getSuccess(data));
};

exports.addGiftcard = async (req, res,) => {
  const { idProduct, noOfOffers } = req.body;
  const giftCardArr = generateGiftCardCodes(noOfOffers, idProduct)
    await giftcardDA.addGiftcard(giftCardArr);
    return res.json(httpUtil.getSuccess());
};

exports.delete = async (req, res) => {
 //  TODO
};
