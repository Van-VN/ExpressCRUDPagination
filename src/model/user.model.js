const BaseModel = require("./base.model");

class UserModel extends BaseModel {
  async createEmployee(name, department, img) {
    let sql = `INSERT INTO EMPLOYEE(NAME, DEPARTMENT, IMG) VALUES('${name}', '${department}', '${img}')`;
    return await this.querySQL(sql);
  }

  async showAllEmployee() {
    let sql = `SELECT * FROM EMPLOYEE`;
    return await this.querySQL(sql);
  }

  async deleteEmployee(id) {
    let sql = `DELETE FROM EMPLOYEE WHERE ID = ${id}`;
    return await this.querySQL(sql);
  }

  async getEmployee(id) {
    let sql = `SELECT * FROM EMPLOYEE WHERE ID = ${id}`;
    return await this.querySQL(sql);
  }

  async limitEmployee(limit, offset) {
    let sql = `SELECT * FROM EMPLOYEE LIMIT ${limit} OFFSET ${offset}`;
    return await this.querySQL(sql);
  }
}

module.exports = new UserModel();
