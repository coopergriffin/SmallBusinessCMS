//Cooper Griffin


//Initialize npm modules and JS files 
const inquirer = require('inquirer');
const departments = require('./departments');
const roles = require('./roles');
const employees = require('./employees');


//Main Menu function 
async function mainMenu() {

    //Users drop down menu 
    const { action } = await inquirer.prompt({
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
            'Exit'
        ]
    });

    //Switch case to handle what user select from menu 
    switch (action) {
        case 'View all departments':
            const allDepartments = await departments.getDepartments();
            console.table(allDepartments);
            break;

        case 'View all roles':
            const allRoles = await roles.getRoles();
            console.table(allRoles);
            break;

        case 'View all employees':
            const allEmployees = await employees.getEmployees();
            console.table(allEmployees);
            break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:'
            });
            await departments.createDepartment(departmentName);
            console.log('Department added successfully!');
            break;

        case 'Add a role':
            const roleInfo = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the role:'
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter the salary for the role:'
                },
                {
                    type: 'number',
                    name: 'departmentId',
                    message: 'Enter the department ID for the role:'
                }
            ]);
            await roles.createRole(roleInfo.title, roleInfo.salary, roleInfo.departmentId);
            console.log('Role added successfully!');
            break;
        case 'Add an employee':
            const employeeInfo = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the employee\'s first name:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the employee\'s last name:'
                },
                {
                    type: 'number',
                    name: 'roleId',
                    message: 'Enter the role ID for the employee:'
                },
                {
                    type: 'number',
                    name: 'managerId',
                    message: 'Enter the manager ID for the employee:'
                }
            ]);
            await employees.createEmployee(employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId, employeeInfo.managerId);
            console.log('Employee added successfully!');
            break;
        case 'Update an employee role':
            const employeeToUpdate = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee you want to update:'
                },
                {
                    type: 'number',
                    name: 'newRoleId',
                    message: 'Enter the new role ID for the employee:'
                }
            ]);
            await employees.updateEmployeeRole(employeeToUpdate.employeeId, employeeToUpdate.newRoleId);
            console.log('Employee role updated successfully!');
            break;
        case 'Exit':
            console.log('Exiting...');
            return;
    }

    // Function called to refresh main menu 
    mainMenu();
}

//Calls the main application function 
mainMenu();