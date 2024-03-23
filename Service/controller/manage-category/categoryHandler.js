const categoryDA = require('./categoryDA');
const { httpUtil } = require('../../utils');

exports.getAllCategory = async (_, res,) => { 
  const data = await categoryDA.getAllCategory();
  return res.json(httpUtil.getSuccess(data));
};

exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;
  const [data] = await categoryDA.checkIfCategoryExist({ categoryName, categoryId: null });
  if (data && data.ISEXIST === 0) {
    await categoryDA.addCategory({ categoryName });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord());
};

exports.updateCategory = async (req, res) => {
  const { categoryId, categoryName } = req.body;
  const [data] = await categoryDA.checkIfCategoryExist({ categoryName, categoryId });
  if (data && data.ISEXIST === 1) {
    await categoryDA.updateCategory({ categoryName, categoryId });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};
