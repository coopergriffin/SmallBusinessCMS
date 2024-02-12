//Cooper Griffin 

const mysql = require('mysql2/promise');


//Function that connect to the database. Stopped redundent code from being called in each function below

async function connectToDatabase() {

    //My Local connection variables 
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'company_db'
    });
}


//Function to create a deparment
async function createDepartment(name) {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('INSERT INTO department (name) VALUES (?)', [name]);
    return rows.insertId;

}


//Function for user to get all departments 
async function getDepartments() {

    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('SELECT * FROM department');
    return rows;
}


//Function for updating an already created department 
async function updateDepartment(id, newName) {

    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('UPDATE department SET name = ? WHERE id = ?', [newName, id]);
    return rows.affectedRows > 0;

}


//Function for deleting a function 
async function deleteDepartment(id) {

    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('DELETE FROM department WHERE id = ?', [id]);
    return rows.affectedRows > 0;
}


//Exports functions so other files can access. 
module.exports = {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
};