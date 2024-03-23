const productDA = require('./productDA');
const { httpUtil } = require('../../utils');

exports.getAllProduct = async (_, res) => {
  const data = await productDA.getAllProduct();
  return res.json(httpUtil.getSuccess(data));
};

exports.addProduct = async (req, res) => {
  const {
    idBrand, idCategory, productName,
    description, termsAndConditions, stepsToRedeem, imageURL,
  } = req.body;
  const [data] = await productDA.checkIfProductExist({
    idBrand, idCategory, productName, idProduct: null,
  });
  if (data && +data.isExist === 0) {
    await productDA.addProduct({
      idBrand,
      idCategory,
      productName,
      description,
      termsAndConditions,
      stepsToRedeem,
      imageURL,
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
  const [data] = await productDA.checkIfProductExist({
    idBrand, idCategory, productName, idProduct,
  });
  console.log('data>>>>', data);
  if (data && +data.isExist === 1) {
    await productDA.updateProduct({
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
