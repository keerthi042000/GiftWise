'user strict';

const config = require('../config/default.json');
const oracledb = require('oracledb');

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

  async getTransactionConnection() {
    this.pool = await this.pool
    this.connection = await oracledb.getConnection();
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

  async execute(SQL, parameters = {}, commit = false) {
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
      console.error("Error executing SQL statement:", err);
      throw err;
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
