const brandDA = require('./brandDA');
const { httpUtil } = require('../../utils')

exports.getAllBrand = async (_req, res) => { 
  const data = await brandDA.getAllBrand();
  return res.json(httpUtil.getSuccess(data));

};

exports.addBrand = async (req, res) => {
  const { brandName } = req.body;
  const [data] = await brandDA.checkIfBrandExist({ brandName, idBrand: null });
  if (data && +data.isExist === 0) {
    await brandDA.addBrand({ brandName });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord())
};

exports.updateBrand = async (req, res) => {
  const { idBrand, brandName } = req.body;
  const [data] = await brandDA.checkIfBrandExist({ brandName, idBrand });
  if (data && +data.isExist === 1) {
    await brandDA.updateBrand({ brandName, idBrand })
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest())
};
