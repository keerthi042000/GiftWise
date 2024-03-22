'user strict';

const config = require('../config/default.json');
const oracledb = require('oracledb');
let pool = null; // Initialize the pool variable

class SQLServer {

  getTransactionConnection = async () => {
    try {
      if(!pool){
        this.pool = await this.getPool();
      }
     // this.connection = await oracledb.getPool('default');
      this.connection = await oracledb.getConnection('default');
      return this.connection;
    }
    catch (error) {
      throw error;
    }
  };
  createPool = async () => {
    try {
      if (!this.pool) { // Check if the pool does not exist
        // Create the pool only if it doesn't exist
        this.pool = await oracledb.createPool(config['db.config']);
        console.log("Connection pool created successfully.");
      }
      return this.pool;
    } catch (err) {
      console.error("Error creating connection pool: ", err);
      throw err;
    }
  }
  getPool = async () => {
    if (!this.pool) {
      await this.createPool();
    }
    return this.pool;
  }
  commitAndReleaseConnection = async () => {
    try {
      await this.connection.commit();
      this.connection.close();
      return this.connection;
    }
    catch (error) {
      throw error;
    }
  }
  rollbackAndReleaseConnection = async () => {
    try {
      await this.connection.rollback();
      this.connection.close();
      return this.connection;
    }
    catch (error) {
      throw error;
    }
  }
  commit = async () => {
    await this.connection.commit();
    this.connection.close();
    return this.connection;
  };

  rollback = async () => {
    await this.connection.rollback();
    this.connection.close();
    return conn;
  };
}

module.exports = SQLServer;


// Sample code 

// (async()=>{
//   let aa  = new SQLServer()
//   const res = await aa.getTransactionConnection();
//     const result = await res.execute(
//       `SELECT *
//       FROM TransactionMode`
//   );
//   aa.commit()
//   console.log(result.rows);
// })()
