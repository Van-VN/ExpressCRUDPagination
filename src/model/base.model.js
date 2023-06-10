const database = require("./database");

class BaseModel {
  constructor() {
    this.connect = database.connectDB();
  }

  querySQL(sql) {
    return new Promise((resolve, reject) => {
      this.connect.query(sql, (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          return resolve(result);
        }
      });
    });
  }
}

module.exports = BaseModel;
