const categoryDA = require('./categoryDA');
const { httpUtil } = require('../../utils');

exports.getAllCategory = async (_, res,) => { 
  const data = await categoryDA.getAllCategory();
  return res.json(httpUtil.getSuccess(data));
};

exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;
  const [data] = await categoryDA.checkIfCategoryExist({ categoryName, idCategory: null });
  if (data && data.isExist === 0) {
    await categoryDA.addCategory({ categoryName });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord());
};

exports.updateCategory = async (req, res) => {
  const { idCategory, categoryName } = req.body;
  const [data] = await categoryDA.checkIfCategoryExist({ categoryName, idCategory });
  if (data && data.isExist === 1) {
    await categoryDA.updateCategory({ categoryName, idCategory });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};
