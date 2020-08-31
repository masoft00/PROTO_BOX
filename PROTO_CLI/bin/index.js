#!/usr/bin/env node

const chalk = require('chalk')
const inquirer = require('inquirer')
const figlet = require('figlet')
const clear = require('clear')
const fs = require('fs')
const exec = require('child_process').exec
const Promise = require('bluebird')
const replace = require('replace')
const ProgressBar = require('progress');

//Function qui Affiche l'entête du nom du Programme
function enteteproject() {
    clear()
    console.log(
        chalk.green(figlet.textSync('PROTO-BOX', { horizontalLayout: 'fitted' }))
    )
    console.log(
        chalk.yellow(
            '                                              by ILAB SONATEL'
        )
    )
    console.log(chalk.green('Bienvenue dans la CLI de Proto-Box \n'))
}

//question pour donner un nom au projet
const nameproject = {
    type: 'input',
    name: 'projectName',
    message: 'Veuiller mettre le nom du projet',
    default: 'Protobox',
    validate: input => {
        return new Promise((resolve, reject) => {
            if (!input.length) {
                reject('Veuillez mettre le nom du projet')
            }
            resolve(true)
        })
    }
}

function creerunrepertoir(nomprojet) {
    try {
        fs.mkdirSync(nomprojet)
    } catch (error) {
        console.log('Erreur lors de la création du repertoire')
    }
}

//question pour que l'utilisateur choisi les focntionnalités qu'il veux implémenter
const fonctionnalites = {
    type: 'checkbox',
    name: 'fonctionnalites',
    message: 'Veuiller selectionner une fonctionnalité SVP: \n',
    choices: [
        'Authentication & Registration',
        'Email Sending',
        'CRUD',
        ''
    ],
    validate: checkbox => {
        return new Promise((resolve, reject) => {
            if (!checkbox.length) {
                reject('Veuiller selectionner une fonctionnalité SVP')
            }
            resolve(true)
        })
    }
}

//questions sur les propriétes
const nomEntite = {
    type: 'input',
    name: 'entityName',
    message: 'Veuillez mettre le nom entité',
    validate: input => {
        return new Promise((resolve, reject) => {
            if (!input.length) {
                reject('Veuillez mettre le nom entité')
            }
            resolve(true)
        })
    }
}

//questions sur les propriétes
const ProjectFront = {
    type: 'input',
    name: 'FrontName',
    message: 'Voullez-vous générer la partie Front ?',
    default: 'ProtoBoxFront',
    validate: input => {
        return new Promise((resolve, reject) => {
            if (!input.length) {
                reject('Voullez-vous générer la partie Front')
            }
            resolve(true)
        })
    }
}

//Question pour voir si l'utilisateur a besion de= front
const frontadd = {
    type: 'input',
    name: 'frontaddQ',
    message: 'Voullez-vous ajouter la partie front ?\nTapper Entrer ou sur n pour dire non (O/n)',
    default: 'O'
}

const attributeadd = {
    type: 'input',
    name: 'attributeaddname',
    message: 'Votre entité a déjà comme attribut email et password.\nVoullez-vous ajouter des attributs ?\nTapper Entrer ou sur n pour dire non (O/n)',
    default: 'O'
}

const attributeName = {
    type: 'String',
    name: 'attributename_name',
    message: "Nom de l'attribut"
}

const attributeType = {
    name: 'type',
    type: 'list',
    message: 'What is the type of your attribute ?',
    choices: [String, 'int', Number, 'password'],
    validate: function(value) {
        if (value.length) {
            return true
        } else {
            return 'Please choose a type'
        }
    }
}

const attributeRequire = {
    name: 'require',
    type: 'input',
    message: "l'attribut est-il obligatoire ? (True /False)",
    default: false
}

const attributeunique = {
    name: 'unique',
    type: 'input',
    message: "l'attribut doit-il être unique ? (True /False)",
    default: false
}

//Question mail sender
const email = {
    type: 'String',
    name: 'emailname',
    message: "Veuillez mettre votre mail"
}
const password = {
    type: 'password',
    name: 'passwordname',
    message: "Veuiller mettre le mot de passe de votre compte gmail"
}

//------------Fonction pour créer un fichier-----------------//
function creerunfichier(fichier, data) {
    fs.appendFile(fichier, data, err => {
        if (err) throw err
    })
}

;
(async() => {
    enteteproject()
    const np = await inquirer.prompt(nameproject)
    const f = await inquirer.prompt(fonctionnalites)

    for (let i = 0; i < f.fonctionnalites.length; i++) {
        // try {
        //     fs.statSync("../" + np.projectName);
        //     console.log("le dossier existe");
        // } catch (err) {
        //     if (err.code === 'ENOENT') {

        //     }
        // }

        creerunrepertoir(np.projectName)
            //-------Chargement de la fonctionnalité
        exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/config', {
            cwd: './' + np.projectName
        })
        exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/db', {
            cwd: './' + np.projectName
        })
        exec('svn export https://github.com/morseck00/PROTO_BOX/trunk/package.json', {
            cwd: './' + np.projectName
        });
        exec('svn export https://github.com/morseck00/PROTO_BOX/trunk/server.js', {
            cwd: './' + np.projectName
        });

        // exec('svn checkout https://github.com/morseck00/PROTOBOXFRONT/trunk/FRONT', {
        //     cwd: './' + np.projectName
        // })

        if (f.fonctionnalites[i] == 'Authentication & Registration') {
            console.log(
                    "Veuillez mettre le nom de l'entité pour la fonctionnalité " +
                    f.fonctionnalites[i]
                )
                //-------Chargement de la fonctionnalité
            exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/Authentication', {
                cwd: './' + np.projectName
            })

            const ne = await inquirer.prompt(nomEntite)
            const ad = await inquirer.prompt(attributeadd)
            const rep = ad.attributeaddname

            //-------bracket pour commencé le fichier yml

            let ouverture = ""
            creerunfichier('./' + np.projectName + '/Authentication/routes/propriety.js', ouverture)
            creerunfichier('./' + np.projectName + '/Authentication/models/data.js', ouverture)


            while (rep == 'O') {
                const an = await inquirer.prompt(attributeName)
                const at = await inquirer.prompt(attributeType)
                const re = await inquirer.prompt(attributeRequire)
                const au = await inquirer.prompt(attributeunique)
                const ad2 = await inquirer.prompt(attributeadd)


                let datapropriety = ",'" + an.attributename_name + "'"
                creerunfichier('./' + np.projectName + '/Authentication/routes/propriety.js', datapropriety)
                let data = '\n' + an.attributename_name + ': { type: ' + at.type + ',required: ' + re.require + ', unique: ' + au.unique + '},\n'

                creerunfichier('./' + np.projectName + '/Authentication/models/data.js', data)
                    //creerunfichier('./' +np.projectName +'/Authentication/routes/propriety.js',datapropriety)  

                if (ad2.attributeaddname == 'n') {
                    let datapropriety = ""
                    creerunfichier('./' + np.projectName + '/Authentication/routes/propriety.js', datapropriety)
                    break;
                }

            }
            //-------bracket pour fermer le fichier yml
            let fermerproprietes = "]}\nmodule.exports.propriety=propriety;"
            let fermer = "}\n module.exports.data=data;"
            creerunfichier('./' + np.projectName + '/Authentication/models/data.js', fermer)
            creerunfichier('./' + np.projectName + '/Authentication/routes/propriety.js', fermerproprietes)

            replace({
                regex: 'user',
                replacement: ne.entityName,
                paths: [
                    './' + np.projectName + '/Authentication/routes/routefile.js',
                    './' + np.projectName + '/Authentication/models/models.js',
                    './' + np.projectName + '/Authentication/middleware/auth.js',
                    './' + np.projectName + '/server.js',
                ],
                recursive: true,
                silent: true
            });

            replace({
                regex: 'User',
                replacement: ne.entityName.charAt(0).toUpperCase() + ne.entityName.substring(1).toLowerCase(),
                paths: [
                    './' + np.projectName + '/Authentication/routes/routefile.js',
                    './' + np.projectName + '/Authentication/models/models.js',
                    './' + np.projectName + '/Authentication/middleware/auth.js',
                ],
                recursive: true,
                silent: true
            });

            var contentLength = 128 * 1024;

            var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 30,
                total: contentLength
            });

            (function next() {
                if (contentLength) {
                    var chunk = Math.random() * 10 * 1024;
                    bar.tick(chunk);

                    if (!bar.complete) {
                        setTimeout(next, Math.random() * 2000);
                    }
                }
            })();
            replace({
                regex: '//auth',
                replacement: "",
                paths: [
                    './' + np.projectName + '/server.js',
                ],
                recursive: true,
                silent: true
            });

            // Installer les modules dans l'api de l'authentification
            exec('npm install ', {
                cwd: './' + np.projectName
            });

            // // Installer les modules dans la partie Front
            // exec('npm install ', {
            //     cwd: './' + np.projectName + '/FRONT'
            // });

        }
        if (f.fonctionnalites[i] == "Email Sending") {

            creerunrepertoir(np.projectName)
                //-------Chargement de la fonctionnalité
            exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/MailSender', {
                cwd: './' + np.projectName
            })

            exec('svn export https://github.com/morseck00/PROTO_BOX/trunk/package.json', {
                cwd: './' + np.projectName
            });
            exec('svn export https://github.com/morseck00/PROTO_BOX/trunk/server.js', {
                cwd: './' + np.projectName
            });
            const mail = await inquirer.prompt(email)
            const pass = await inquirer.prompt(password)
            let data = 'email=' + mail.emailname + '\n' + 'password=' + pass.passwordname

            creerunfichier('./' + np.projectName + '/.env', data)

            //animation chargement 

            var contentLength = 128 * 1024;

            var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 30,
                total: contentLength
            });

            (function next() {
                if (contentLength) {
                    var chunk = Math.random() * 10 * 1024;
                    bar.tick(chunk);

                    if (!bar.complete) {
                        setTimeout(next, Math.random() * 1000);
                    }
                }
            })();

            replace({
                regex: '//sendmail',
                replacement: "",
                paths: [
                    './' + np.projectName + '/server.js',
                ],
                recursive: true,
                silent: true
            });

            exec('npm install ', {
                cwd: './' + np.projectName
            });
        }
        if (f.fonctionnalites[i] == 'CRUD') {
            console.log(
                    "Veuillez mettre le nom de l'entité pour la fonctionnalité " +
                    f.fonctionnalites[i]
                )
                //-------Chargement de la fonctionnalité
            exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/CRUD', {
                cwd: './' + np.projectName
            })

            const ne = await inquirer.prompt(nomEntite)
            const ad = await inquirer.prompt(attributeadd)
            const rep = ad.attributeaddname

            //-------bracket pour commencé le fichier yml

            let ouverture = ""
            creerunfichier('./' + np.projectName + '/CRUD/routes/propriety.js', ouverture)
            creerunfichier('./' + np.projectName + '/CRUD/models/data.js', ouverture)

            while (rep == 'O') {
                const an = await inquirer.prompt(attributeName)
                const at = await inquirer.prompt(attributeType)
                const re = await inquirer.prompt(attributeRequire)
                const au = await inquirer.prompt(attributeunique)
                const ad2 = await inquirer.prompt(attributeadd)

                let datapropriety = "'" + an.attributename_name + "',"
                creerunfichier('./' + np.projectName + '/CRUD/routes/propriety.js', datapropriety)

                let data = '\n' + an.attributename_name + ': { type: ' + at.type + ',required: ' + re.require + ', unique: ' + au.unique + '},\n'

                creerunfichier('./' + np.projectName + '/CRUD/models/data.js', data)

                if (ad2.attributeaddname == 'n') {
                    let datapropriety = ""
                    creerunfichier('./' + np.projectName + '/CRUD/routes/propriety.js', datapropriety)
                    break;
                }
            }
            //-------bracket pour fermer le fichier propriety
            let fermerproprietes = "]}\nmodule.exports.propriety=propriety;"
            let fermer = "}\n module.exports.data=data;"
            creerunfichier('./' + np.projectName + '/CRUD/models/data.js', fermer)
            creerunfichier('./' + np.projectName + '/CRUD/routes/propriety.js', fermerproprietes)

            replace({
                regex: 'crud',
                replacement: ne.entityName,
                paths: [
                    './' + np.projectName + '/CRUD/routes/routefile.js',
                    './' + np.projectName + '/CRUD/models/models.js',
                    './' + np.projectName + '/server.js',
                ],
                recursive: true,
                silent: true
            });

            replace({
                regex: 'Crud',
                replacement: ne.entityName.charAt(0).toUpperCase() + ne.entityName.substring(1).toLowerCase(),
                paths: [
                    './' + np.projectName + '/CRUD/routes/routefile.js',
                    './' + np.projectName + '/CRUD/models/models.js',
                ],
                recursive: true,
                silent: true
            });

            var contentLength = 128 * 1024;
            var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 30,
                total: contentLength
            });

            (function next() {
                if (contentLength) {
                    var chunk = Math.random() * 10 * 1024;
                    bar.tick(chunk);

                    if (!bar.complete) {
                        setTimeout(next, Math.random() * 2000);
                    }
                }
            })();
            replace({
                regex: '//CrudSer',
                replacement: "",
                paths: [
                    './' + np.projectName + '/server.js',
                ],
                recursive: true,
                silent: true
            });

            // Installer les modules dans l'api de Crud
            exec('npm install ', {
                cwd: './' + np.projectName
            });

            // // Installer les modules dans la partie Front
            // exec('npm install ', {
            //     cwd: './' + np.projectName + '/FRONT'
            // });
        }

        if (f.fonctionnalites[i] == "Pdf Generator") {

            creerunrepertoir(np.projectName)
                //-------Chargement de la fonctionnalité
            exec('svn checkout https://github.com/morseck00/PROTO_BOX/trunk/PdfGenerator', {
                cwd: './' + np.projectName
            })

            exec('svn export https://github.com/morseck00/PROTO_BOX/trunk/package.json', {
                cwd: './' + np.projectName
            });
            exec('svn export https://github.com/morseck00/PROTO_BOX/trunk/server.js', {
                cwd: './' + np.projectName
            });

            //animation chargement 
            var contentLength = 128 * 1024;
            var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 30,
                total: contentLength
            });

            (function next() {
                if (contentLength) {
                    var chunk = Math.random() * 10 * 1024;
                    bar.tick(chunk);

                    if (!bar.complete) {
                        setTimeout(next, Math.random() * 1000);
                    }
                }
            })();
            exec('npm install ', {
                cwd: './' + np.projectName
            });
        }
    }
})()