'user strict';

const config = require('../config/default.json');
const oracledb = require('oracledb');
let pool = null; // Initialize the pool variable

function convertKeysToUpperCase(obj) {
  const newObj = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key.toUpperCase()] = obj[key];
    }
  }
  return newObj;
}


class SQLServer {

  async getTransactionConnection() {
    if (!pool) {
      this.pool = await this.getPool();
    }
    // this.connection = await oracledb.getPool('default');
    this.connection = await oracledb.getConnection('default');
    return this.connection;
  }
  async createPool() {
    if (!pool) { // Check if the pool does not exist
      // Create the pool only if it doesn't exist
      pool = await oracledb.createPool(config['db.config']);
      console.log("Connection pool created successfully.");
    }
    return pool;

  }
  async getPool() {
    if (!pool) {
      await this.createPool();
    }
    return pool;
  }
  async commitAndReleaseConnection() {

    await this.connection.commit();
    await this.connection.close();
    return this.connection;

  }
  async rollbackAndReleaseConnection() {

    await this.connection.rollback();
    await this.connection.close();
    return this.connection;

  }

  async rollback() {
    await this.connection.rollback();
    this.connection.close();
    return this.connection;
  }
  async execute(SQL, parameters = {}, commit = false) {
    parameters = convertKeysToUpperCase(parameters)
    const con = await this.getTransactionConnection();
   
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT_ARRAY,
    fetchInfo: {      
        "isExist": { type: oracledb.STRING },

    }
};
    const result = await con.execute(SQL, parameters, options);
    commit ? this.commitAndReleaseConnection() : null
    // Convert data to JSON format
    console.log(result.metaData[0].dbTypeName)
    const jsonArray = [];
    if (result.rows) {
      // const jsonData = result.rows.map(row => {
      //   const obj = {};
      //   result.metaData.forEach((meta, index) => {
      //     obj[meta.name] = row[index];
      //     jsonObject[columnNames[index]] = value;
      //   });
      //   return obj;
      // });
      // return jsonData
      const columnNames = result.metaData.map(column => column.name);
     
      result.rows.forEach(row => {
          const jsonObject = {};
          result.rows.forEach((value, index) => {
              jsonObject[columnNames[index]] = value;
          });
          jsonArray.push(jsonObject);
      });
      console.log("><<><><><<><><><><><><><><><><>jsonObject",jsonArray)
      return jsonObject;
    }
    return result
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
