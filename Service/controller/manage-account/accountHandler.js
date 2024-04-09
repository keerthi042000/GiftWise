const accountDA = require('./accountDA');
const { httpUtil } = require('../../utils')
const SQLServer = require('../../utils/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretKey = require('./../../config/default.json').secretKey;
const jwt = require('jsonwebtoken');


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
  const accountOverviewData = {
    firstName: 'Keerthi',
    lastName: 'Doe',
    emailId: 'rosie.doe@example.com',
  };
  console.log("req.session>>>90",req.sessionID)

  return res.json(httpUtil.getSuccess(accountOverviewData));
};
