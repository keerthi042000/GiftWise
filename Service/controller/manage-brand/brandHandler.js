const brandDA = require('./brandDA');
const { httpUtil } = require('../../utils')

exports.getAllBrand = async (_req, res) => { 
  const data = await brandDA.getAllBrand();
  return res.json(httpUtil.getSuccess(data));

};

exports.addBrand = async (req, res) => {
  const { brandName } = req.body;
  const [data] = await brandDA.checkIfBrandExist({ brandName, brandId: null });
  if (data && data.ISEXIST === 0) {
    await brandDA.addBrand({ brandName });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord())
};

exports.updateBrand = async (req, res) => {
  const { brandId, brandName } = req.body;
  const [data] = await brandDA.checkIfBrandExist({ brandName, brandId });
  console.log("data>>>",data)
  console.log("brandId, brandName",brandId, brandName)
  if (data && data.ISEXIST === 1) {
    
    await brandDA.updateBrand({ brandName, brandId })
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest())
};
