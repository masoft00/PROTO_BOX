const inquirer = require('inquirer');

module.exports = {
        projectInformations : () => {
        const questions =[
            {
                name: 'projectName',
                type: 'input',
                message: 'Enter your project name:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a name for your project.';
                    }
                }
            },
            {
                name: 'fonctionnalites',
                type: 'checkbox',
                message: 'Which fonctionnalities do you wannt to have in your application? make a choice:',
                choices: [ 'Authentification','UploadingFile','Registration','MailSender','FormContact','PdfGenerator'], 
            },
        ]
        return inquirer.prompt(questions)
        }, 




        authentification : () =>{
            const authQuestions= [
                {  
                    name: 'name',
                    type: 'input',
                    message: 'Which attribute do you wanna add for your authentification?',
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please enter an attribute for your authentification';
                        }
                    }
                },
                {  
                    'name': 'type',
                    'type': 'list',
                    'message': 'What is the type of your attribute?',
                    'choices': [ 'String','int','Number','password'],
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please choose a type';
                        }
                    }
                },
                {  
                    name: 'required',
                    type: 'input',
                    message: 'Is this attibute required?',
                    default: false,
                }, 
                {
                    name: 'unique',
                    type: 'input',
                    message: 'Is this attibute unique?',
                    default: false,  
                },
                {
                    name: 'addAttribute',
                    type: 'input',
                    message: 'Do you wanna add an other attribute?',
                    default: false,  
                }
            ]
            return inquirer.prompt(authQuestions)
        },


        registration : () =>{
            const registrationQquestions= [
                {  
                    name: 'name',
                    type: 'input',
                    message: 'Which attribute do you want for your registration?',
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please enter an attribute for your registration';
                        }
                    }
                },
                {  
                    name: 'type',
                    type: 'list',
                    message: 'What is the type of your attribute?',
                    choices: [ 'String','int','Number','password'],
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please choose a type';
                        }
                    }
                },
                {  
                    name: 'required',
                    type: 'input',
                    message: 'Is this attibute required?',
                    default: false,
                }, 
                {
                    name: 'unique',
                    type: 'input',
                    message: 'Is this attibute unique?',
                    default: false,  
                },
                {
                    name: 'addAttribute',
                    type: 'input',
                    message: 'Do you wanna add an other attribute?',
                    default: false,  
                }
            ]
            return inquirer.prompt(registrationQquestions)
        },


        formContact : () =>{
            const formContactQquestions= [
                {  
                    name: 'name',
                    type: 'input',
                    message: 'Which attribute do you want for your form contact?',
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please enter an attribute for your form contact';
                        }
                    }
                },
                {  
                    name: 'type',
                    type: 'list',
                    message: 'What is the type of your attribute?',
                    choices: [ 'String','int','Number','password'],
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please choose a type';
                        }
                    }
                },
                {  
                    name: 'required',
                    type: 'confirm',
                    message: 'Is this attibute required?',
                    default: false,
                }, 
                {
                    name: 'unique',
                    type: 'confirm',
                    message: 'Is this attibute unique?',
                    default: false,  
                },
                {
                    name: 'addAttribute',
                    type: 'confirm',
                    message: 'Do you wanna add an other attribute?',
                    default: false,  
                }
            ]
            return inquirer.prompt(formContactQquestions)
        },



        MailSender : () =>{
            const mailSenderQquestions= [
                {  
                    name: 'name',
                    type: 'input',
                    message: 'Which attribute do you want for your form contact?',
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please enter an attribute for your form contact';
                        }
                    }
                },
                {  
                    name: 'type',
                    type: 'list',
                    message: 'What is the type of your attribute?',
                    choices: [ 'String','int','Number','password'],
                    validate: function( value ) {
                        if (value.length) {
                            return true;
                        } else {
                            return 'Please choose a type';
                        }
                    }
                },
                {  
                    name: 'required',
                    type: 'confirm',
                    message: 'Is this attibute required?',
                    default: false,
                }, 
                {
                    name: 'unique',
                    type: 'confirm',
                    message: 'Is this attibute unique?',
                    default: false,  
                },
                {
                    name: 'addAttribute',
                    type: 'confirm',
                    message: 'Do you wanna add an other attribute?',
                    default: false,  
                }
            ]
            return inquirer.prompt(mailSenderQquestions)
        },





    } 
