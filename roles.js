//Cooper Griffin 

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

// Function to create a new role

async function createRole(title, salary, departmentId) {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
    return rows.insertId;

}

// Function to get all roles
async function getRoles() {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('SELECT * FROM role');
    return rows;
}

// Function to update a role's title or salary

async function updateRole(roleId, newTitle, newSalary) {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('UPDATE role SET title = ?, salary = ? WHERE id = ?', [newTitle, newSalary, roleId]);
    return rows.affectedRows > 0;
}

// Function to delete a role by id
async function deleteRole(roleId) {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('DELETE FROM role WHERE id = ?', [roleId]);
    return rows.affectedRows > 0;
}

  


//Lets given functions be accessed and used outside of file 
module.exports = {

    createRole,
    getRoles,
    updateRole,
    deleteRole
};