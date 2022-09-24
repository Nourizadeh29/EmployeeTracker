const mysql = require("mysql2");
class Tracker {
  connection = null;
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "ets_db",
    });
    this.connection.connect((err) => {
      if (err) throw console.log(err);
      console.log("Database Connected To Mysql DB");
    });
  }
  viewAllDepartments = () => {
    return new Promise((ress, rej) => {
      this.connection.query("select * from department", (err, res) => {
        if (err) throw err;
        ress(res);
      });
    });
  };

  viewAllRoles = () => {
    return new Promise((ress, rej) => {
      this.connection.query(
        "select r.*,d.name from role r left join department d on r.department_id = d.id",
        (err, res) => {
          if (err) throw err;
          ress(res);
        }
      );
    });
  };

  viewAllEmployees = () => {
    return new Promise((ress, rej) => {
      this.connection.query(
        "select e.*,d.name,CONCAT(m.first_name,' ',m.last_name) as manager_name,r.title,r.salary from employee e left join role r on r.id  = e.role_id left join department d on r.department_id = d.id left join employee m on m.id = e.manager_id",
        (err, res) => {
          if (err) throw err;
          ress(res);
        }
      );
    });
  };

  addDepartment = (depart_name) => {
    return new Promise((ress, rej) => {
      this.connection.query(
        "INSERT INTO department SET name = ?",
        [depart_name],
        (err, res) => {
          if (err) throw ress(false);
          ress(true);
        }
      );
    });
  };

  addRoles = (title, salary, depart_id) => {
    return new Promise((ress, rej) => {
      this.connection.query(
        "INSERT INTO role SET title = ?,salary=?,department_id=?",
        [title, salary, depart_id],
        (err, res) => {
          if (err) throw ress(false);
          ress(true);
        }
      );
    });
  };

  addEmployees = (first_name, last_name, role_id, manager_id) => {
    return new Promise((ress, rej) => {
      this.connection.query(
        "INSERT INTO employee SET first_name = ?,last_name=?,role_id=?,manager_id=?",
        [first_name, last_name, role_id, manager_id],
        (err, res) => {
          if (err) throw ress(false);
          ress(true);
        }
      );
    });
  };
  updateEmployeesRoleId = (employee_id, role_id) => {
    return new Promise((ress, rej) => {
      this.connection.query(
        "UPDATE employee SET role_id=? WHERE id = ?",
        [role_id, employee_id],
        (err, res) => {
          if (err) throw ress(false);
          ress(true);
        }
      );
    });
  };
}
module.exports.Tracker = Tracker;
