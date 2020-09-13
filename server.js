const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require('console.table');

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sarah1198",
  database: "employeesDB"
});

db.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

function runSearch() {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
                'Exit'
            ]
        })
        .then(function(answer) {
            switch(answer.action) {
            case 'View all departments':
                viewDepartment();
                break;
            
            case 'View all roles':
                viewRole();
                break;
            
            case 'View all employees':
                viewEmployees();
                break;

            case 'Add department':
                addDepartment();
                break;
    
            case 'Add role':
                addRole();
                break;
                
            case 'Add employee':
                addEmployee();
                break;
            
            case 'Update employee role':
                updateRole();
                break;

            case 'Exit':
                db.end();
                break;
            }
        });
}

function viewDepartment() {
    const query = 'SELECT * FROM department';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table('All departments:', res);
        runSearch();
    });
}

function viewRole() {
    const query = 'SELECT * FROM role';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table('All roles:', res);
        runSearch();
    });
}

function viewEmployees() {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table('All employees:', res);
        runSearch();
    });
}

function addDepartment() {
    inquirer
    .prompt({
        name: 'department',
        type: 'input',
        message: 'Enter the name of the new department'   
    }).then(function(answer) {
        db.query(
            'INSERT INTO department SET ?', 
            {
            name: answer.department
            }
        );
        const query = 'SELECT * FROM department';
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table('All departments:', res);
        runSearch();
        })
    });
}

function addRole() {
    inquirer
    .prompt([
        {
        name: 'role',
        type: 'input',
        message: 'Enter the title of the new role'   
        },
        {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary of the new role'  
        },
        {
        name: 'departmentId',
        type: 'input',
        message: 'Enter the id of the department'  
        }
    ]).then(function(answer) {
        db.query(
            'INSERT INTO role SET ?', 
            {
            title: answer.role,
            salary: answer.salary,
            department_id: answer.departmentId
            }
        );
        const query = 'SELECT * FROM role';
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table('All roles:', res);
        runSearch();
        })
    });
}

function addEmployee() {
    inquirer
        .prompt([
            {
            name: 'first_name',
            type: 'input',
            message: 'Enter the first name of the new employee'   
            },
            {
            name: 'last_name',
            type: 'input',
            message: 'Enter the last name of the new employee'  
            },
            {
            name: 'role_id',
            type: 'input',
            message: 'Enter the role of the employee'
            },
            {
            name: 'manager_id',
            type: 'input',
            message: 'Select the name of the manager (if applicable)' 
            }
    ]).then(function(answer) {
        db.query(
            'INSERT INTO employee SET ?', 
            {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
            }
        );
        const query = 'SELECT * FROM employee';
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table('All employees:', res);
        runSearch();
        })
    });
}

function updateRole() {
    let employees;
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
        employees = res.map(function(employee){
            return employee.first_name + ' ' + employee.last_name;
        });
        console.table(employees);
    });
   
    inquirer
        .prompt([
            {
            name: 'name',
            type: 'input',
            message: 'First name of employee',
            // choices: 
            },
            {
            name: 'role_id',
            type: 'input',
            message: 'Enter the new role'
            }
    ]).then(function(answer){
        db.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [answer.role_id, answer.name], function (err, res) {
            if (err) throw err;
            console.table('All employees:', res);
        viewEmployees();
            })
        });
}