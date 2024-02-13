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
            'Update a role',
            'Update a department',
            'Update an employee',
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
        case 'Update a role':
            const roleToUpdate = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'roleId',
                    message: 'Enter the ID of the role you want to update:'
                },
                {
                    type: 'input',
                    name: 'newTitle',
                    message: 'Enter the new title for the role:'
                },
                {
                    type: 'number',
                    name: 'newSalary',
                    message: 'Enter the new salary for the role:'
                },
                {
                    type: 'number',
                    name: 'newDepartmentId',
                    message: 'Enter the new department ID for the role:'
                }
            ]);
            const isRoleUpdated = await roles.updateRole(roleToUpdate.roleId, roleToUpdate.newTitle, roleToUpdate.newSalary, roleToUpdate.newDepartmentId);
            if (isRoleUpdated) {
                console.log('Role updated successfully!');
            } else {
                console.log('Failed to update role. Role with specified ID may not exist.');
            }
            break;
        case 'Update a department':
            const departmentToUpdate = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'departmentId',
                    message: 'Enter the ID of the department you want to update:'
                },
                {
                    type: 'input',
                    name: 'newName',
                    message: 'Enter the new name for the department:'
                }
            ]);
            await departments.updateDepartment(departmentToUpdate.departmentId, departmentToUpdate.newName);
            console.log('Department updated successfully!');
            break;
        
        case 'Update an employee':
            const updateEmployee = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee you want to update:'
                },
                {
                    type: 'input',
                    name: 'newFirstName',
                    message: 'Enter the new first name for the employee:'
                },
                {
                    type: 'input',
                    name: 'newLastName',
                    message: 'Enter the new last name for the employee:'
                },
                {
                    type: 'number',
                    name: 'newRoleId',
                    message: 'Enter the new role ID for the employee:'
                },
                {
                    type: 'number',
                    name: 'newManagerId',
                    message: 'Enter the new manager ID for the employee:'
                }
            ]);
            await employees.updateEmployee(updateEmployee.employeeId, updateEmployee.newFirstName, updateEmployee.newLastName, updateEmployee.newRoleId, updateEmployee.newManagerId);
            console.log('Employee updated successfully!');
            break
        case 'Update an employee role':
            const employeeToUpdateRole = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee whose role you want to update:'
                },
                {
                    type: 'number',
                    name: 'newRoleId',
                    message: 'Enter the new role ID for the employee:'
                }
            ]);
            const isEmployeeRoleUpdated = await employees.updateEmployeeRole(employeeToUpdateRole.employeeId, employeeToUpdateRole.newRoleId);
            if (isEmployeeRoleUpdated) {
                console.log('Employee role updated successfully!');
            } else {
                console.log('Failed to update employee role. Employee with specified ID may not exist or role with specified ID may not exist.');
            }
            break;
        case 'Exit':
            console.log('Exiting...');
            process.exit(); // Exiting the application
    }

    // Function called to refresh main menu 
    mainMenu();
}

//Calls the main application function 
mainMenu();