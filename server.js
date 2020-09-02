const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { listenerCount } = require('process');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Sarah1198',
    database: 'employeesDB'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
  });

