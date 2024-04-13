const productDA = require('./productDA');
const { httpUtil } = require('../../utils');

exports.getAllProduct = async (_, res) => {
  const data = await productDA.getAllProduct(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));
};

exports.addProduct = async (req, res) => {
  const {
    idBrand, idCategory, productName,
    description, termsAndConditions, stepsToRedeem, imageURL, quantity, amount 
  } = req.body;

  const [data] = await productDA.checkIfProductExist(instanceOfSQLServer,{
    idBrand, idCategory, productName, idProduct: null,
  });
  if (data && +data.isExist === 0) {
    await productDA.addProduct(instanceOfSQLServer, {
      idBrand,
      idCategory,
      productName,
      description,
      termsAndConditions,
      stepsToRedeem,
      imageURL,
      quantity,
      // amount
    });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord());
};

exports.updateProduct = async (req, res) => {
  const {
    idProduct, idBrand, idCategory, productName,
    description, termsAndConditions, stepsToRedeem, imageURL,
  } = req.body;
  const [data] = await productDA.checkIfProductExist(instanceOfSQLServer, {
    idBrand, idCategory, productName, idProduct,
  });
  if (data && +data.isExist === 1) {
    await productDA.updateProduct(instanceOfSQLServer, {
      idBrand,
      idCategory,
      productName,
      description,
      termsAndConditions,
      stepsToRedeem,
      imageURL,
      idProduct,
    });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};
