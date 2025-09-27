'user strict';

const config = require('../config/default.json');
const oracledb = require('oracledb');
// config["db.config"].password = process.env.DB_PASSWORD;

const path = require('path');
// Set TNS_ADMIN to the wallet folder
process.env.TNS_ADMIN = path.join(__dirname, "../../Wallet_GC");

const MAX_RETRY_COUNT = 5;
const RETRY_DELAY_MS = 100
function convertKeysToUpperCase(obj) {
  const newObj = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key.toUpperCase()] = obj[key];
    }
  }
  return newObj;
}

// Create a connection pool
async function createPool() {
  try {
    await oracledb.createPool({ ...config['db.config'],  "poolAlias": this.poolName } );
    console.log('Connection pool created successfully.');
  } catch (err) {
    console.error('Error creating connection pool:', err.message);
  }
}
class SQLServer {
  constructor(poolName) {
    this.pool = createPool();
    this.connection = null;
    this.poolName = poolName
  }

  async resetConnection() {
    try {
      // Close the existing connection (if open)
      await oracledb.getPool().close(3); // Close the connection pool with a 10-second timeout
  
      // Re-establish the connection
      await oracledb.createPool({ ...config['db.config'],  "poolAlias": this.poolName } )
  
      console.log('SQL connection reset successfully.');
    } catch (error) {
      console.error('Error resetting SQL connection:', error);
    }
  }
  
  async getTransactionConnection() {
    this.pool = await this.pool
    this.connection = await oracledb.getConnection();
    // this.connection = await oracledb.getConnection({
    //     user: "ADMIN",
    //     password: "gcmsCS542...",
    //     connectString: "gc_high"  // TNS alias from tnsnames.ora
    // });
    return this.connection;
  }
  async commitAndReleaseConnection() {
    try {
      await this.connection.commit();
      await this.connection.release();
      this.connection = null; // Reset connection after release
    } catch (err) {
      console.error("Error committing and releasing connection:", err);
      throw err;
    }
  }

  async rollbackAndReleaseConnection() {
    try {
      await this.connection.rollback();
      await this.connection.release();
      this.connection = null; // Reset connection after release
    } catch (err) {
      console.error("Error rolling back and releasing connection:", err);
      throw err;
    }
  }

  async execute(SQL, parameters = {}, commit = false, retryCount = 0) {
    
    try {
      parameters = convertKeysToUpperCase(parameters);
      const connection = await this.getTransactionConnection();
      const options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT_ARRAY,
        fetchInfo: {
          "isExist": { type: oracledb.STRING }
        }
      };
      const result = await connection.execute(SQL, parameters, options);
      if (commit) {
        await this.commitAndReleaseConnection();
      }
      if (result.rows) {
        const jsonData = result.rows.map(row => {
          const obj = {};
          result.metaData.forEach((meta, index) => {
            obj[meta.name] = row[index];
          });
          return obj;
        });
        return jsonData;
      }
      return result;
    } catch (err) {
      // console.error("Error executing SQL statement:", err);
      if (retryCount < MAX_RETRY_COUNT) { // Define MAX_RETRY_COUNT as per your requirement
        console.error(`Error executing SQL statement. Retrying (${retryCount + 1}/${MAX_RETRY_COUNT}):`, err);
        // Retry with a delay
        await this.resetConnection()
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return this.execute(SQL, parameters, commit, retryCount + 1);
      } else {
        throw err; // Throw the error if maximum retry count is reached
      }
      // throw err;
    }
  }
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
