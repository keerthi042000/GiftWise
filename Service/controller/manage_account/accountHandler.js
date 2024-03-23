const stockDA = require('./accountDA');
const  { httpUtil, customException, isValidEmail } = require('../../utils')
const _ = require('lodash');
const SQLServer = require('../../utils/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (req, res, next) => {
  try {
    let aa  = new SQLServer()
    const connection = await aa.getTransactionConnection();
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).send('Invalid email.');
    }

    // Verify email ID existence
    const user = await stockDA.verifyUserName(connection, email);
    if (!user.length) {
      throw customException('Email ID Not Found, Please create a new account');
    }

    // Verify user credentials (assuming verifyUser returns the user data)
    // const userData = await stockDA.verifyUser(connection, email, password);
    // if (!userData.length) {
    //   throw customException('Incorrect password');
    // }
    console.log(user[0])
    console.log(user[0].password)
    const passwordMatch = await bcrypt.compare(password, user[0][2]);
    if (!passwordMatch) {
      throw customException('Incorrect password');
    }

    // User authenticated successfully
    return res.json(httpUtil.getSuccess(userData));
  } catch (error) {
    // Handle errors
    console.error('Login error:', error);
    return res.status(400).send(error.message);
  }
};

exports.signup = async (req, res, next) => {
  try {

    let aa  = new SQLServer()
    const connection = await aa.getTransactionConnection();

    const { email, password, firstname, lastname, dob_string, address, zipcode, phone, phonetype, isCustomer } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userExists  = await stockDA.verifyUserName(connection, email);
    if (userExists.length) {
      throw new customException('Email already exists, please login to your account');
    }
    if (isCustomer === 1){
      roleid = await stockDA.getRoleID(connection,0,1);
    }

    const userid = await stockDA.createUser(connection, roleid[0] , email, hashedPassword, firstname, lastname, new Date(dob_string), address, zipcode, phone, phonetype);
    aa.commit();
    return res.json(httpUtil.getSuccess(userid));
  } catch (error) {
      console.error('Signup error:', error);
      return res.status(400).send(error.message);
  }
};

exports.getAccountOverview = async (req, res, next) => {
  const accountOverviewData = {
    firstName: 'Keerthi',
    lastName: 'Doe',
    email: 'rosie.doe@example.com',
    };
    return res.json(httpUtil.getSuccess(accountOverviewData));
};

exports.saveStockValue = async (req, res, next) => {
  const { idUser,idStock,value }= req.body;
  const checkUserGrants =  await stockDA.checkUserWriteAccess(idUser,idStock);
  if(checkUserGrants.length)
      { 
        const data = await stockDA.saveStockValue(idStock,value);    
       return res.json(httpUtil.getSuccess(data));
      }
  throw customException('Access Denied');
};
  
exports.getlist = async (req, res, next) => {
  const idUser = req.params.idUser;
  const data = await stockDA.getListOfStock(idUser);
  return res.json(httpUtil.getSuccess(data));
};

exports.updateStockValue= async () => {

  const result = await stockDA.getStockValue();
    if(result && result.length){
      await result.map(async val=>{
            await stockDA.saveStockValue(val.idStock,Math.floor(Math.random() * 999));
      })
      let getUpdateData = await stockDA.getAllStockValue() 
      return getUpdateData;
    }else 
      return [];
};

//extra API
exports.getAllStockTransaction =  async (req, res, next) => {
  const result = await  stockDA.getAllStockTransaction();
  res.json(httpUtil.getSuccess(result))
}

exports.getAllUser =  async (req, res, next) => {
  const result = await  stockDA.getAllUser();
  res.json(httpUtil.getSuccess(result))
}
exports.getAllSystemAttributes =  async (req, res, next) => {
  const result = await  stockDA.getAllSystemAttributes();
  res.json(httpUtil.getSuccess(result))
}
exports.getAllUserGrants =  async (req, res, next) => {
  const result = await  stockDA.getAllUserGrants();
  res.json(httpUtil.getSuccess(result))
}
