const promocodeDA = require('./promocodeDA');
const { httpUtil } = require('../../utils');

exports.getAllPromocode = async (_, res) => { 
  const data = await promocodeDA.getAllPromocode();
  return res.json(httpUtil.getSuccess(data));
};

exports.addPromocode = async (req, res,) => {
  const { productId, name, discountInPercentage } = req.body;
  const [data] = await promocodeDA.checkIfPromocodeExist({ name, productId, promocodeId: null });

  if (data && data.ISEXIST === 0) {
    console.log('CDCDCD');
    await promocodeDA.addPromocode({ productId, name, discountInPercentage });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord());
};

exports.updatePromocode = async (req, res) => {
  const {
    promocodeId, name, productId, discountInPercentage,
  } = req.body;
  const [data] = await promocodeDA.checkIfPromocodeExist({ name, productId, promocodeId });
  if (data && data.ISEXIST === 1) {
    await promocodeDA.updatePromocode({
      productId, name, discountInPercentage, promocodeId,
    });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};
