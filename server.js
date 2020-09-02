let mysql = require("mysql");
let inquirer = require("inquirer");
let consoleTable = require('console.table');

let db = mysql.createConnection({
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

