const promocodeDA = require('./promocodeDA');
const { httpUtil } = require('../../utils');

exports.getAllPromocode = async (_, res) => { 
  const data = await promocodeDA.getAllPromocode();
  return res.json(httpUtil.getSuccess(data));
};

exports.addPromocode = async (req, res,) => {
  const { idProduct, name, discountInPercentage } = req.body;
  const [data] = await promocodeDA.checkIfPromocodeExist({ name, idProduct, idPromocode: null });

  if (data && +data.isExist === 0) {
    await promocodeDA.addPromocode({ idProduct, name, discountInPercentage });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord());
};

exports.updatePromocode = async (req, res) => {
  const {
    idPromocode, name, idProduct, discountInPercentage,
  } = req.body;
  const [data] = await promocodeDA.checkIfPromocodeExist({ name, idProduct, idPromocode });
  if (data && +data.isExist === 1) {
    await promocodeDA.updatePromocode({
      idProduct, name, discountInPercentage, idPromocode,
    });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};
