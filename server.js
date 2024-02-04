const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
{
  host: 'localhost',
  user: 'root',
  password: 'yourSQLpassword',
  database: 'employees_db',
},
);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to employees database');
  startApp();
});

const startApp = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          db.end();
          console.log('Exiting application');
          break;
      }
    });
}

const viewDepartments = () => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

const viewRoles = () => {
  db.query('SELECT * FROM role_department_view', (err, results) => {
    if(err) throw err;
    console.table(results);
    startApp();
  });
}

const viewEmployees = () => {
  db.query('SELECT * FROM employee_view', (err, results) => {
    if(err) throw err;
    console.table(results);
    startApp();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the new department:',
    })
    .then((answer) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      db.query(query, [answer.departmentName], (err, results) => {
        if (err) throw err;
        console.table(results);
        console.log(`Department '${answer.departmentName}' added successfully!`);
        startApp();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'input',
        name: 'roleDepartmentId',
        message: 'Enter the department ID for the new role:',
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      db.query(query, [answer.roleTitle, answer.roleSalary, answer.roleDepartmentId], (err, results) => {
        if (err) throw err;
        console.table(results)
        console.log(`Role '${answer.roleTitle}' added successfully!`);
        startApp();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeFirstName',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'employeeRoleId',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'input',
        name: 'employeeManagerId',
        message: "Enter the employee's manager ID (or leave blank if none):",
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      db.query(query, [answer.employeeFirstName, answer.employeeLastName, answer.employeeRoleId, answer.employeeManagerId], (err, results) => {
        if (err) throw err;
        console.log(`Employee '${answer.employeeFirstName} ${answer.employeeLastName}' added successfully!`);
        startApp();
      });
    });
};