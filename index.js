const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/Manager');
const managerArray = [];

const Engineer = require('./lib/Engineer');
const engineerArray = [];

const Intern = require('./lib/Intern');
const internArray = [];

function createManager() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your employee ID number?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is you email?'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your office number?'
        },
    ])
    .then(ans => {
        let newManager = new Manager(ans.name, ans.id, ans.email, ans.officeNumber);
        managerArray.push(newManager);
        employeeMenu();
    })
}

function employeeMenu () {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Which employee type would you like to add?',
            choices: ['Engineer', 'Intern', 'Team Roster Complete']
        }
    ])
    .then(userChoice => {
        switch (userChoice.menu) {
            case 'Engineer':
                createEngineer();
                break;
            case 'Intern':
                createIntern();
                break;
            case 'Team Roster Complete':
                generateEmployees();
        } 
    })
}

function createEngineer () {
    inquirer
    .prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your employee ID number?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is you email?'
        },
        {
          type: 'input',
          name: 'github',
          message: 'What is your GitHub username?',
        }
    ])
    .then(ans => {
        let newEngineer = new Engineer(ans.name, ans.id, ans.email, ans.github);
        engineerArray.push(newEngineer);
        employeeMenu();
    })
}

function createIntern() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your employee ID number?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is you email?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school did you go to?'
        }
    ])
    .then(ans => {
        let newIntern = new Intern(ans.name, ans.id, ans.email, ans.school);
        internArray.push(newIntern)
        employeeMenu();
    })
}

function generateEmployees (roster) {
    const managerHTMLstring = managerArray.map(manager => {
        return `
        <div class="column is-4">
                <div class="card">
                    <div class="card-header has-background-info ">
                        <div class="card-header-title is-centered has-text-white">
                            <h3> ${manager.name} <br>
                                ${manager.role} &nbsp; <i class="fa-solid fa-mug-hot"></i> </h3>
                        </div>
                    </div>
                    <div class="card-content">
                        ${manager.id} <br>
                        ${manager.email} <br>
                        ${manager.officeNumber} <br>
                    </div>
                </div>
            </div>
        `
    }) .join('')

    const engineerHTMLstring = engineerArray.map(engineer => {
        return `
        <div class="column is-4">
                <div class="card">
                    <div class="card-header has-background-info ">
                        <div class="card-header-title is-centered has-text-white">
                            <h3> ${engineer.name} <br>
                                ${engineer.role} &nbsp; <i class="fa-solid fa-glasses"></i> </h3>
                        </div>
                    </div>
                    <div class="card-content">
                        ${engineer.id} <br>
                        ${engineer.email} <br>
                        ${engineer.github} <br>
                    </div>
                </div>
            </div>
        `
    }).join('')

    const internHTMLstring = internArray.map(intern => {
        return `
        <div class="column is-4">
        <div class="card">
            <div class="card-header has-background-info ">
                <div class="card-header-title is-centered has-text-white">
                    <h3> ${intern.name} <br>
                        ${intern.role} &nbsp; <i class="fa-solid fa-user-graduate"></i> </h3>
                </div>
            </div>
            <div class="card-content">
                ${intern.id} <br>
                ${intern.email} <br>
                ${intern.school} <br>
            </div>
        </div>
    </div>
    `
    }).join('')

    const htmlString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        <title>Document</title>
    </head>
    <body>
        <div class="block">
            <section class="hero is-danger">
                <div class="hero-body">
                    <p class="title has-text-centered">
                        My Team
                    </p>
                </div>
            </section>
        </div>
        <div class="container has-text-centered">
            <div class="columns">
            ${managerHTMLstring}
            ${engineerHTMLstring}
            ${internHTMLstring}
        </body>
    </html>
    `
    console.log(engineerArray, managerArray, internArray)
    // use fs to create Html file
    const writeFile = (htmlString) => {
        fs.writeFile(htmlString,  err => {
            if (err) throw err;
        console.log('It Worked!!');
    })
    writeFile()
    }
}
createManager();