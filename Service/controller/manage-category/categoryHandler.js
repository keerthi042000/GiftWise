const categoryDA = require('./categoryDA');
const { httpUtil } = require('../../utils');

exports.getAllCategory = async (_, res,) => { 
  const data = await categoryDA.getAllCategory(instanceOfSQLServer);
  return res.json(httpUtil.getSuccess(data));
};

exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;
  const [data] = await categoryDA.checkIfCategoryExist(instanceOfSQLServer,{ categoryName, idCategory: null });
  if (data && +data.isExist === 0) {
    await categoryDA.addCategory(instanceOfSQLServer,{ categoryName });
    return res.json(httpUtil.getSuccess());
  }
  return res.json(httpUtil.getDuplicateRecord());
};

exports.updateCategory = async (req, res) => {
  const { idCategory, categoryName } = req.body;

  const [data] = await categoryDA.checkIfCategoryExist(instanceOfSQLServer,{ categoryName, idCategory });
  if (data && +data.isExist === 1) {
    await categoryDA.updateCategory(instanceOfSQLServer,{ categoryName, idCategory });
    return res.json(httpUtil.getSuccess([]));
  }
  return res.json(httpUtil.getBadRequest());
};


exports.deleteCategory = async (req, res) => {
  const {idCategory} = req.params;
  await categoryDA.deleteCategory(instanceOfSQLServer, { idCategory })
  return res.json(httpUtil.getSuccess([]));
};