'user strict';

const mysql = require('mysql');
const util = require('util');
const config = require('../config/default.json');

const pool = mysql.createPool(config['db.config']);
pool.query = util.promisify(pool.query); 
pool.getConnection = util.promisify(pool.getConnection);

// To get transaction connection
pool.getTransactionConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.beginTransaction = await util.promisify(connection.beginTransaction);
    await connection.beginTransaction();
    connection.query = await util.promisify(connection.query);
    connection.rollback = await util.promisify(connection.rollback);
    connection.commit = await util.promisify(connection.commit);
    connection.release = await util.promisify(connection.release);
    return connection;
  }
  catch (error) {
    throw error;
  }
};

// Get Commit and release Pool;
pool.commitAndReleaseConnection = async conn => {
  try {
    await conn.commit();
    conn.release();
    return conn;
  }
  catch (error) {
    throw error;
  }
};

// Commit the transaction and release connection to pool

pool.rollbackAndReleaseConnection = async conn => {
  try {
    await conn.rollback();
    conn.release();
    return conn;
  }
  catch (error) {
    throw error;
  }
};

pool.commit = async conn => {
  await conn.commit();
  conn.release();
  return conn;
};

pool.rollback = async conn => {
  await conn.rollback();
  conn.release();
  return conn;
};

module.exports = pool;
