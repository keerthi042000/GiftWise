const accountDA = require('./accountDA');
const { httpUtil } = require('../../utils')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretKey = require('./../../config/default.json').secretKey;
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.login = async (req, res) => {
  try {
    const connection = await instanceOfSQLServer.getTransactionConnection();
    const { emailId, password } = req.body;
    const user = await accountDA.verifyUserName(connection, emailId);
    if (!user.length) {
      return res.json(httpUtil.getBadRequest([null, 'Email ID Not Found, Please create a new account']));
    }

    const lockedAccount = await accountDA.checkLockedAccount(connection, user[0][0]);
    if (lockedAccount) {
      return res.json(httpUtil.getBadRequest([null, 'Account locked, Please try again after 24 hours']));
    }

    const passwordMatch = await bcrypt.compare(password, user[0][2]);
    if (!passwordMatch) {
      await accountDA.updateLoginAttempts(connection, user[0][0]);
      connection.commit();
      return res.json(httpUtil.getBadRequest([null, 'Incorrect password']))
    }

    // Payload for the JWT token
    const payload = {
      idUser: user[0][0],
      emailId: user[0][1],
      isSuperAdmin: user[0][3]
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
    await accountDA.resetLoginAttempts(connection, user[0][0]);
    connection.commit();
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
    const payload = {
      idUser: userId,
      emailId: emailId
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '5m' });
    return res.json(httpUtil.getSuccess({
      ...payload,
      accessToken: token
    }));
  } catch (error) {
    console.error('Signup error:', error);
    return res.json(httpUtil.getBadRequest([null, 'Something went wrong']))
  }
};

exports.getAccountOverview = async (req, res) => {
  try{    

    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, secretKey);
    const idUser = decoded.idUser;

    [customer_details] = await accountDA.getCustomerDetails(instanceOfSQLServer, {idUser});
    const orderApiResponse = await axios.get(`http://localhost:3004/api/order?idUser=${idUser}`);
    customer_details['order_details'] = orderApiResponse.data.payload;
    return res.json(httpUtil.getSuccess(customer_details));
  } catch (err) {
    console.log("Error while getting details : ",err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }
};


exports.updateAccount = async (req, res) => {
  try{
    const connection = await instanceOfSQLServer.getTransactionConnection();

    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, secretKey);
    const idUser = decoded.idUser;

    const { user, customer, Phone } = req.body;
    if (user && Object.keys(user).length) {
      if (user.password && user.newpassword){
        const [idUser] = await accountDA.verifyUserName(connection, decoded.emailId);
        const passwordMatch = await bcrypt.compare(user.password, idUser[2]);
        if (!passwordMatch) {
          return res.json(httpUtil.getBadRequest([null, 'Incorrect password']))
        }
        user.password = await bcrypt.hash(user.newpassword, saltRounds);
        delete user.newpassword;
      }
      const userUpdateResult = await accountDA.updateDetails(connection, idUser, user, 'updateUser');
      console.log('User update result:', userUpdateResult);
    }
    if (customer && Object.keys(customer).length) {
      const customerUpdateResult = await accountDA.updateDetails(connection, idUser, customer, 'updateCustomer');
      console.log('Customer update result:', customerUpdateResult);
    }
    if (Phone && Object.keys(Phone).length) {
      const phoneUpdateResult = await accountDA.updateDetails(connection, idUser, Phone, 'updatePhone');
      console.log('Phone update result:', phoneUpdateResult);
    }
    connection.commit();
    return res.json(httpUtil.getSuccess({ idUser }));
} catch (err) {
    console.log("Error while updating : ", err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }
};


exports.saveFeedback = async (req, res) => {
  try{    

    const connection = await instanceOfSQLServer.getTransactionConnection();

    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, secretKey);
    const idUser = decoded.idUser;
    console.log(req.body);
    const { feedback, rating } = req.body;

    const userFeedbackUpdateResult = await accountDA.insertFeedback(connection, idUser, feedback, rating);
    connection.commit();
    return res.json(httpUtil.getSuccess(userFeedbackUpdateResult));
  } catch (err) {
    console.log("Error while saving feedback : ",err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.json(httpUtil.getUnauthorized([null, 'Invalid token']))
    } else {
      return res.json(httpUtil.getException([null, 'Something went wrong']))
    }
  }
};