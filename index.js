const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/Manager');
const newManager = '';

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
        newManager = new Manager(ans.name, ans.id, ans.email, ans.officeNumber);
        // menu function
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
    .then(menuChoice => {
        switch (menuChoice) {
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
        engineerArray.push(newEngineer)
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
    })
}

function generateEmployees () {
    // write the html page
}