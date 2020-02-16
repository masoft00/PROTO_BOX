#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer  = require('../lib/inquirer');
const fs = require('fs');
const { spawn } = require("child_process");
const { exec } = require("child_process");


clear();

console.log(
  chalk.hex('#009793')(
    figlet.textSync('Proto-Box', { horizontalLayout: 'full' })
  )
);

console.log(
  chalk.hex('#FF5733')('                                                      Innovation Lab')
)

const start = async () => {
  const name = await inquirer.projectInformations();
  console.log(name);
  fs.mkdirSync(name.projectName);
  const projet=name.projectName;

  exec("cd" ,{projet}  , (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    //console.log(`stdout: ${stdout}`);
  });
 
  fs.writeFile('./'+projet+'/server.js','', function(err) {
    if(err) return console.error(err);
  });


  
  exec('npm init', (err, stdout) => {
          console.log(stdout);
          console.log('over');
        });
  /*const init = spawn('npm init', function (err, stdout, stderr) {
    console.log('over');
  });

      init.stdout.on("data", data => {
        process.stdout.write(data);
      });

      init.stderr.on("data", data => {
          console.log(`stderr: ${data}`);
      });

      init.on('error', (error) => {
          console.log(`error: ${error.message}`);
      });

      init.on("close", code => {
          console.log(`child process exited with code ${code}`);
      });*/

      /*process.stdin.on('readable', function() {

        var chunk = process.stdin.read();
    
        if(chunk !== null) {
            init.stdin.write(chunk);
        }
    });*/

      /*exec("npm init"  , (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });*/

  fs.mkdir("./"+projet+"/models", (err) => {
    if (err) throw err;
  });
  fs.mkdir("./"+projet+"/routes", (err) => {
    if (err) throw err;
  });

  for(let i = 0; i < name.fonctionnalites.length; i++) {
    if (name.fonctionnalites[i] == 'Authentification') {
      console.log("Yesss authentication");
      const security = async () => {
      const auth = await inquirer.authentification();
      console.log(auth);
      //let parser = JSON.stringify(auth);
      let donnees = auth.name+":{type:  "+auth.type+",required: "+auth.required+",unique: "+auth.unique+"}"            
      fs.writeFile('./'+projet+'/models/authentification.js', donnees, function(err) {
        if(err) return console.error(err);
      });
      exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/AuthentificationJWT', {cwd: './'+projet+'/routes'}, function(err, stdout, stderr) {
        if (err) {
          console.log(`error: ${err.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      });
      do
        {
          const securityRepeated = async () => {
          const authRepeated = await inquirer.authentification();
          console.log(auth);
          let donneesRepeated =","+authRepeated.name+":{type:  "+authRepeated.type+",required: "+authRepeated.required+",unique: "+authRepeated.unique+"}"
          fs.appendFile('./'+projet+'/models/authentification.js', donneesRepeated, function (err) {
            if (err) throw err;
          });
          }
          securityRepeated()
        }
      while(auth.addAttribute==true);
      }
      security()
    }
    if(name.fonctionnalites[i] == 'Registration'){
      const registration = async () => {
      const register = await inquirer.registration();
      console.log(register);
      let donnees = register.name+":{type:  "+register.type+",required: "+register.required+",unique: "+register.unique+"}"
      
      fs.writeFile('./'+projet+'/models/registration.js', donnees, function(err) {
        if(err) return console.error(err);
      });
      exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/RegistrationService', {cwd: './'+projet+'/routes'}, function(err, stdout, stderr) {
        if (err) {
          console.log(`error: ${err.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      });
      do
      {
        const registrationRepeated = async () => {
        const registerRepeated = await inquirer.registration();
        console.log(registerRepeated);
        let donneesRepeated =","+registerRepeated.name+":{type:  "+registerRepeated.type+",required: "+registerRepeated.required+",unique: "+registerRepeated.unique+"}"
        fs.appendFile('./'+projet+'/models/authentification.js', donneesRepeated, function (err) {
          if (err) throw err;
        });
        }
        registrationRepeated()
      }
      while(register.addAttribute==true);
      }
      registration();
    }
      
    
    if (name.fonctionnalites[i] == 'FormContact'){
      const formContact = async () => {
      const contactInfo = await inquirer.formContact();
      console.log(contactInfo);
      let donnees = contactInfo.name+":{type:  "+contactInfo.type+",required: "+contactInfo.required+",unique: "+contactInfo.unique+"}"
      fs.writeFile('./'+projet+'/models/formContact.js', donnees, function(err) {
        if(err) return console.error(err);
      });
      exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/formContact', {cwd: './'+projet+'/routes'}, function(err, stdout, stderr) {
        if (err) {
          console.log(`error: ${err.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      });
      do
      {
        const formContactRepeated = async () => {
        const contactInfoRepeated = await inquirer.formContact();
        console.log(contactInfoRepeated);
        let donneesRepeated =","+contactInfoRepeated.name+":{type:  "+contactInfoRepeated.type+",required: "+contactInfoRepeated.required+",unique: "+contactInfoRepeated.unique+"}"
        fs.appendFile('./'+projet+'/models/authentification.js', donneesRepeated, function (err) {
          if (err) throw err;
        });
        }
        formContactRepeated()
      }
      while(contactInfo.addAttribute==true);
      }
      formContact();
    }

    if(name.fonctionnalites[i] == 'UploadingFile'){
      exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/UploadingFileService', {cwd: './'+projet+'/routes'}, function(err, stdout, stderr) {
        if (err) {
          console.log(`error: ${err.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      });
    }

    /*if(name.fonctionnalites[i] == 'MailSender'){
      exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/MailSender', {cwd: './'+projet+'/routes'}, function(err, stdout, stderr) {
        if (err) {
          console.log(`error: ${err.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      });
    }*/


    if(name.fonctionnalites[i] == 'PdfGenerator'){
      exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/PdfGenerator', {cwd: './'+projet+'/routes'}, function(err, stdout, stderr) {
        if (err) {
          console.log(`error: ${err.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      });
    }


  }
  }


start();


