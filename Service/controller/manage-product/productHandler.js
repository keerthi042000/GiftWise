const productDA = require('./productDA');
const { httpUtil } = require('../../utils');

exports.getAllProduct = async ( req , res) => {
  if(req.query.id && req.query.type){
    if(req.query.type === 'idBrand'){
      const data = await productDA.getProductByBrandID(instanceOfSQLServer, req.query.id);
      return res.json(httpUtil.getSuccess(data));
    }
    if(req.query.type === 'idCategory'){
      const data = await productDA.getProductByCategoryID(instanceOfSQLServer, req.query.id);
      return res.json(httpUtil.getSuccess(data));
    }
  }
  const data = await productDA.getAllProduct(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));
};

exports.getProduct = async (req, res) => {
  const data = await productDA.getProduct(instanceOfSQLServer, req.params.idProduct);
  console.log(data)
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
      amount
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

exports.deleteProduct = async (req, res) => {
  const { idProduct } = req.params;
  await productDA.deleteProduct(instanceOfSQLServer, { idProduct })
  return res.json(httpUtil.getSuccess([]));
};