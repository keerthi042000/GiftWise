const accountDA = require('./accountDA');
const { httpUtil } = require('../../utils')
const SQLServer = require('../../utils/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretKey = require('./../../config/default.json').secretKey;
const jwt = require('jsonwebtoken');
const axios = require('axios');


exports.login = async (req, res) => {
  try {
    let instanceOfSQLServer = new SQLServer()
    const connection = await instanceOfSQLServer.getTransactionConnection();
    const { emailId, password } = req.body;
    const user = await accountDA.verifyUserName(connection, emailId);
    console.log("user",user)
    if (!user.length) {
      return res.json(httpUtil.getBadRequest([null, 'Email ID Not Found, Please create a new account']))
    }
    const passwordMatch = await bcrypt.compare(password, user[0][2]);
    if (!passwordMatch) {
      return res.json(httpUtil.getBadRequest([null, 'Incorrect password']))
    }
    // Payload for the JWT token
    const payload = {
      idUser: user[0][0],
      emailId: user[0][1]
    };
    console.log("req.session",req.sessionID)
    const token = jwt.sign(payload, secretKey, { expiresIn: '5m' });
    req.session.email = emailId;
    return res.json(httpUtil.getSuccess({
      ...payload,
      accessToken: token
    }));
  } catch (error) {
    console.error('Login error:', error);
    return res.json(httpUtil.getBadRequest([null, 'Something went wrong']))
  }
};

exports.signup = async (req, res) => {
  try {

    let instanceOfSQLServer = new SQLServer()
    const connection = await instanceOfSQLServer.getTransactionConnection();

    const { emailId, password, firstName, lastName, dob, address, zipcode, phone, phoneType, isCustomer, isSuperAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userExists = await accountDA.verifyUserName(connection, emailId);
    if (userExists.length) {
      return res.json(httpUtil.getDuplicateRecord([null, 'Email already exists, please login to your account']))
    }
    let roleId = await accountDA.getRoleID(connection, isSuperAdmin, isCustomer);
    if (!roleId) {
      return res.json(httpUtil.getBadRequest([null, 'No Roles found']))
    }
    const userId = await accountDA.createUser(connection, roleId[0], emailId, hashedPassword);
    if (!userId) {
      return res.json(httpUtil.getBadRequest([null, 'User not created']))
    }
    await accountDA.InsertCustomer(connection, userId, firstName, lastName, new Date(dob), address, zipcode, phone, phoneType);

    connection.commit();
    req.session.email = emailId;
    return res.json(httpUtil.getSuccess({ userId }));
  } catch (error) {
    console.error('Signup error:', error);
    return res.json(httpUtil.getBadRequest([null, 'Something went wrong']))
  }
};


exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    return res.json(httpUtil.getSuccess());;
  });
};

exports.getAccountOverview = async (req, res) => {
  let instanceOfSQLServer = new SQLServer()
  idUser = req.userID;
  idUser = 1;
  [customer_details] = await accountDA.getCustomerDetails(instanceOfSQLServer, {idUser});
  const orderApiResponse = await axios.get(`http://localhost:3004/api/order?idUser=${idUser}`);
  customer_details['order_details'] = orderApiResponse.data.payload;
  return res.json(httpUtil.getSuccess(customer_details));
};


exports.updateAccount = async (req, res) => {
  try{
    let instanceOfSQLServer = new SQLServer();
    const connection = await instanceOfSQLServer.getTransactionConnection();
    console.log(req.body);
    idUser = 1;
    const { user, customer, Phone } = req.body;
    console.log("user : ", user, "customer : ",customer, "phone : ", Phone);
    if (user && Object.keys(user).length) {
      // const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userUpdateResult = await accountDA.updateDetails(connection, idUser, user, 'updateUser');
      console.log('User update result:', userUpdateResult);
    }
    if (customer && Object.keys(customer).length) {
      const customerUpdateResult = await accountDA.updateDetails(connection, idUser, customer, 'updateCustomer');
      console.log('Customer update result:', customerUpdateResult);
    }
    if (Phone && Object.keys(Phone).length) {
      const phoneUpdateResult = await accountDA.updateDetails(instanceOfSQLServer, connection, idUser, Phone, 'updatePhone');
      console.log('Phone update result:', phoneUpdateResult);
    }
    connection.commit();
    return res.json(httpUtil.getSuccess({ idUser }));
} catch (error) {
  console.error('Error while updating details:', error);
  return res.json(httpUtil.getBadRequest([null, 'Something went wrong']))
}
};
