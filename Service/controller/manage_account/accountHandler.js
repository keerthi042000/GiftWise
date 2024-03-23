const accountDA = require('./accountDA');
const  { httpUtil, customException } = require('../../utils')
const _ = require('lodash');
const SQLServer = require('../../utils/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (req, res, next) => {
  try {
    let aa  = new SQLServer()
    const connection = await aa.getTransactionConnection();
    const { email, password } = req.body;
    const user = await accountDA.verifyUserName(connection, email);
    if (!user.length) {
      return res.status(400).send('Email ID Not Found, Please create a new account');
    }
    const passwordMatch = await bcrypt.compare(password, user[0][2]);
    if (!passwordMatch) {
      return res.status(400).send('Incorrect password');
    }
    return res.json(httpUtil.getSuccess(user));
  } catch (error) {
    console.error('Login error:', error);
    return res.status(400).send("Something went wrong");
  }
};

exports.signup = async (req, res, next) => {
  try {

    let aa  = new SQLServer()
    const connection = await aa.getTransactionConnection();

    const { email, password, firstname, lastname, dob_string, address, zipcode, phone, phonetype, isCustomer, isSuperAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userExists  = await accountDA.verifyUserName(connection, email);
    if (userExists.length) {
      throw new customException('Email already exists, please login to your account');
    }
    roleid = await accountDA.getRoleID(connection,isSuperAdmin,isCustomer);
    const userid = await accountDA.createUser(connection, roleid[0] , email, hashedPassword, firstname, lastname, new Date(dob_string), address, zipcode, phone, phonetype);
    connection.commit();
    return res.json(httpUtil.getSuccess(userid));
  } catch (error) {
      console.error('Signup error:', error);
      return res.status(400).send('Something went wrong');
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
