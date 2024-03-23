const productDA = require('./productDA');
const { httpUtil } = require('../../utils');

exports.getAllProduct = async (_, res) => {
  const data = await productDA.getAllProduct();
  return res.json(httpUtil.getSuccess(data));
};

exports.addProduct = async (req, res) => {
  const {
    brandId, categoryId, productName,
    description, termsAndConditions, stepsToRedeem, imageURL,
  } = req.body;
  const [data] = await productDA.checkIfProductExist({
    brandId, categoryId, productName, productId: null,
  });
  if (data && data.ISEXIST === 0) {
    await productDA.addProduct({
      brandId,
      categoryId,
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
    productId, brandId, categoryId, productName,
    description, termsAndConditions, stepsToRedeem, imageURL,
  } = req.body;
  const [data] = await productDA.checkIfProductExist({
    brandId, categoryId, productName, productId,
  });
  console.log('data>>>>', data);
  if (data && data.ISEXIST === 1) {
    await productDA.updateProduct({
      brandId,
      categoryId,
      productName,
      description,
      termsAndConditions,
      stepsToRedeem,
      imageURL,
      productId,
    });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};
