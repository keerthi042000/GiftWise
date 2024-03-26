const brandDA = require('./brandDA');
const { httpUtil } = require('../../utils')
const SQLServer = require('../../utils/db');
let instanceOfSQLServer = new SQLServer()

exports.getAllBrand = async (_req, res) => {
  const data = await brandDA.getAllBrand(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));

};

exports.addBrand = async (req, res) => {
  const { brandName } = req.body;
  const [data] = await brandDA.checkIfBrandExist(instanceOfSQLServer, { brandName, idBrand: null });
  if (data && +data.isExist === 0) {
    await brandDA.addBrand(instanceOfSQLServer, { brandName });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord())
};

exports.updateBrand = async (req, res) => {
  const { idBrand, brandName } = req.body;
  let instanceOfSQLServer = new SQLServer()
  const [data] = await brandDA.checkIfBrandExist(instanceOfSQLServer, { brandName, idBrand });
  if (data && +data.isExist === 1) {
    await brandDA.updateBrand(instanceOfSQLServer, { brandName, idBrand })
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest())
};


exports.deleteBrand = async (req, res) => {
  const { idBrand } = req.params;
  await brandDA.deleteBrand(instanceOfSQLServer, { idBrand })
  return res.json(httpUtil.getSuccess([]));
};
