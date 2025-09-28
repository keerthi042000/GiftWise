const express = require('express');
const apiConfig = require('./constants/apiConfig');
const { errorHandlers } = require('./common');
const controllers = require('./controller');
const session = require('express-session');

const app = express();
const cors = require('cors');
app.use(session({
  secret: 'abcd',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,expires:60000 }
}));

// const cors = require('cors');

const corsOptions = {
    // origin: 'https://giftwise-flame.vercel.app', // your frontend URL
    origin: '*', // your frontend URL
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // allows cookies and auth headers
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cors());
app.use(apiConfig.ROOT_URL, controllers);


app.use([
  errorHandlers.errorLogMiddleware,
  errorHandlers.customError,
  errorHandlers.validationErrorMiddleware,
  errorHandlers.handleExceptionSQLMiddleware,
]);
module.exports = app;
