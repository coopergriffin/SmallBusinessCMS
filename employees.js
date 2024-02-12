//Cooper Griffin 


//init promise call for asynchrounous access 
const mysql = require('mysql2/promise');

// Function to establish a MySQL connection
async function connectToDatabase() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'company_db'
    });
}

// Function to create a new employee
async function createEmployee(firstName, lastName, roleId, managerId) {

    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    return rows.insertId;
}

// Function to get all employees
async function getEmployees() {

    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('SELECT * FROM employee');
    return rows;
}

// Function to update an employee's role
async function updateEmployeeRole(employeeId, newRoleId) {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    return rows.affectedRows > 0;
}



// Function to delete an employee by id
async function deleteEmployee(employeeId) {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('DELETE FROM employee WHERE id = ?', [employeeId]);
    return rows.affectedRows > 0;
}



//Lets the respective functions access outside of this file 
module.exports = {
    createEmployee,
    getEmployees,
    updateEmployeeRole,
    deleteEmployee
};