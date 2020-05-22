const Manager = require("./Lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./Lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./Lib/render");

var employees = [];
function outputTeam (){
    fs.writeFileSync(outputPath, render(employees), "utf8");
}

async function createTeam(){
    try{ 
    const userChoice = await inquirer
    .prompt([
        {
            type: "list",
            name: "employeeChoice",
            message: "What role are you applying?",
            choices: [
                "manager",
                "engineer", 
                "intern",
                "No more employee to add"
            ]
        }
    ])
            switch(userChoice.employeeChoice){
            case "manager":
            addManager();
            break;

            case "engineer":
            addEngineer();
            break;

            case "intern":
            addIntern();
            break;

            default:
            outputTeam();
            }
    } catch (err){
        console.log(err);
    }
}

    async function addManager() {
        try {
        const userInputM = await inquirer
        .prompt([
            {
                type: "input",
                name: "managerName",
                Message: "Name of manager?"
            },
            {
                type: "input",
                name: "managerId",
                message: "Manager's Id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Manager's phone number?"
            }
        ]) 
        const manager = new Manager(userInputM.managerName, userInputM.managerId, userInputM.managerEmail, userInputM.managerOfficeNumber)

        employees.push(manager);
            
        createTeam();
        } catch(err){
          console.log(err);
        }
    }

    async function addEngineer() {
        try{
        const userInputE = await inquirer
        .prompt([
            {
                type: "Input",
                name: "engineerName",
                message: "What is this engineer's name?"
            },

            {
                type: "Input",
                name: "engineerId",
                message: "Engineer's Id?"
            },
        
            {
                type: "Input",
                name: "engineerEmail",
                message: "Engineer's email?"
            },
        
            {
                type: "Input",
                name: "website",
                message: "Engineer's website?"
            }        
        ])
            const engineer = new Engineer(userInputE.engineerName, userInputE.engineerId, userInputE.engineerEmail, userInputE.engineerGithub);
            employees.push(engineer);

        createTeam();
        } catch (err){
            console.log(err);
        }
    }

    async function addIntern() {
        try{
        const userInputI = await inquirer
        .prompt([
            {
                type: "input",
                name: "internName",
                message: "Intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "Intern's Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "Intern's email?"
            },
            {
                type: "input",
                name: "website",
                message: "Intern's website?"
            }    
        ]) 
            const intern = new Intern (userInputI.internName, userInputI.internId, userInputI.internEmail, userInputI.internSchool);
            employees.push(intern);
        createTeam();
        } catch(err){
            console.log(err);
        }
    }

createTeam(); 
