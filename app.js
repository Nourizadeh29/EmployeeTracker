const inquirer = require("inquirer");
const { Tracker } = require("./Tracker");
const tracker = new Tracker();
async function startApp() {
  let welcomeString = "=======================================\n";
  welcomeString += "= WELCOME TO EMPLOYEE TRACKING SYSTEM =\n";
  welcomeString += "=======================================\n";
  console.log(welcomeString);

  let startString = "Choose any of the following below-\n";
  startString += "1)view all departments-\n";
  startString += "2)view all roles-\n";
  startString += "3)view all employees\n";
  startString += "4)add a department-\n";
  startString += "5)add a role-\n";
  startString += "6)add an employee-\n";
  startString += "7)update an employee role-\n";
  inquirer
    .prompt([
      {
        name: "response",
        message: startString,
        type: "input",
      },
    ])
    .then(async function (res) {
      res = parseInt(res.response);
      if (res == 1) {
        const deptRes = await tracker.viewAllDepartments();
        console.log("========================\n");
        console.log("ID\t Department\n");
        console.log("========================\n");
        deptRes.map((e) => {
          console.log(`${e.id}\t ${e.name}\n`);
        });
        restart();
      } else if (res === 2) {
        const roleRes = await tracker.viewAllRoles();
        console.log("===================================================\n");
        console.log("ID\t Title\t\t Salary\t\t Department\n");
        console.log("==================================================\n");
        roleRes.map((e) => {
          console.log(`${e.id}\t ${e.title}\t\t ${e.salary}\t\t ${e.name}\n`);
        });
        restart();
      } else if (res === 3) {
        const empRes = await tracker.viewAllEmployees();
        console.log(
          "=============================================================================================================================\n"
        );
        console.log(
          "ID\t Fisrt Name\t\t Last Name\t\t Title\t\t Salary\t\t Department\t\t Manager\n"
        );
        console.log(
          "===============================================================================================================================\n"
        );
        empRes.map((e) => {
          console.log(
            `${e.id}\t ${e.first_name}\t\t ${e.last_name}\t\t ${e.title}\t\t ${e.salary}\t\t ${e.name}\t\t ${e.manager_name}\n`
          );
        });
        restart();
      } else if (res === 4) {
        addDepartment();
      } else if (res === 5) {
        addRoles();
      } else if (res === 6) {
        addEmployees();
      } else if (res === 7) {
        updateEmployeesRole();
      } else {
        console.log("You Choose Invalid\n");
        setTimeout(() => startApp(), 1000);
      }
    });
}

function restart() {
  inquirer
    .prompt([
      {
        name: "response",
        message: "Do You Want to go main menu ?\n 1)Yes\t2)No",
        type: "input",
      },
    ])
    .then((resp) => {
      let op = parseInt(resp.response);
      if (op === 1) {
        startApp();
      } else {
        restart();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "depart_name",
        message: "Enter Department Name\n",
        type: "input",
      },
    ])
    .then(async (resp) => {
      const res = await tracker.addDepartment(resp.depart_name);
      if (res) {
        console.log("Successfully Department Added !\n");
        restart();
      } else {
        console.log("Failed To Add Try Again..!\n");
        restart();
      }
    });
}

function addRoles() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "Enter Title\n",
        type: "input",
      },
      {
        name: "salary",
        message: "Enter Salary\n",
        type: "input",
      },
      {
        name: "depart_id",
        message: "Enter Department ID\n",
        type: "input",
      },
    ])
    .then(async (resp) => {
      const res = await tracker.addRoles(
        resp.title,
        resp.salary,
        resp.depart_id
      );
      if (res) {
        console.log("Successfully Role Added !\n");
        restart();
      } else {
        console.log("Failed To Add Try Again..!\n");
        restart();
      }
    });
}
function addEmployees() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Enter First Name\n",
        type: "input",
      },
      {
        name: "last_name",
        message: "Enter Last Name\n",
        type: "input",
      },
      {
        name: "role_id",
        message: "Enter Role ID\n",
        type: "input",
      },
      {
        name: "manager_id",
        message: "Enter Manager ID\n",
        type: "input",
      },
    ])
    .then(async (resp) => {
      const res = await tracker.addEmployees(
        resp.first_name,
        resp.last_name,
        resp.role_id,
        resp.manager_id
      );
      if (res) {
        console.log("Successfully Role Added !\n");
        restart();
      } else {
        console.log("Failed To Add Try Again..!\n");
        restart();
      }
    });
}
function updateEmployeesRole() {
  inquirer
    .prompt([
      {
        name: "employee_id",
        message: "Enter Employee ID\n",
        type: "input",
      },
      {
        name: "role_id",
        message: "Enter Role ID\n",
        type: "input",
      },
    ])
    .then(async (resp) => {
      const res = await tracker.updateEmployeesRoleId(
        resp.employee_id,
        resp.role_id
      );
      if (res) {
        console.log("Successfully Employee Role Added !\n");
        restart();
      } else {
        console.log("Failed To Add Try Again..!\n");
        restart();
      }
    });
}
startApp();
