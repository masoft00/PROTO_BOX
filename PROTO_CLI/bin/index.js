#!/usr/bin/env node
const chalk       = require('chalk')
const inquirer    = require('inquirer')
const figlet      = require('figlet')
const clear       = require('clear')
const fs          = require('fs')
const exec        = require('child_process').exec
const cliProgress = require('cli-progress')
const Promise     = require('bluebird')
const Spinner     = require('cli-spinner').Spinner
var replace       = require('replace')

//Function qui Affiche l'entête du nom du Programme
function enteteproject () {
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
  type   : 'input',
  name   : 'projectName',
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

function creerunrepertoir (nomprojet) {
  try {
    fs.mkdirSync(nomprojet)
  } catch (error) {
    console.log('Erreur lors de la création du repertoire')
  }
}

//question pour que l'utilisateur choisi les focntionnalités qu'il veux implémenter
const fonctionnalites = {
  type   : 'checkbox',
  name   : 'fonctionnalites',
  message: 'Veuiller selectionner une fonctionnalité SVP: \n',
  choices: [
    'Authentication',
    'File Upload',
    'Email Sending',
    'Contact Form',
    'Pdf Generator',
    'Crud',
    'Registration'
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
  type   : 'input',
  name   : 'entityName',
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

const attributeadd = {
  type   : 'input',
  name   : 'attributeaddname',
  message: 
    'Voullez-vous ajouter des attributs ?\nTapper Entrer ou sur n pour dire non (O/n)',
  default: 'O'
}

const attributeName = {
  type   : 'String',
  name   : 'attributename_name',
  message: "Nom de l'attribut"
}

const attributeType = {
  name   : 'type',
  type   : 'list',
  message: 'What is the type of your attribute ?',
  choices: [String, 'int', Number, 'password'],
  validate: function (value) {
    if (value.length) {
      return true
    } else {
      return 'Please choose a type'
    }
  }
}

const attributeRequire = {
  name   : 'require',
  type   : 'input',
  message: "l'attribut est-il obligatoire ? (True /False)",
  default: false
}

const attributeunique = {
  name   : 'unique',
  type   : 'input',
  message: "l'attribut doit-il être unique ? (True /False)",
  default: false
}
//------------Fonction pour créer un fichier-----------------//
function creerunfichier (fichier, data) {
  fs.appendFile(fichier, data, err => {
    if (err) throw err
  })
}

;(async () => {
  enteteproject()
  const np = await inquirer.prompt(nameproject)
  const f  = await inquirer.prompt(fonctionnalites)

  for (let i = 0; i < f.fonctionnalites.length; i++) {
    if (f.fonctionnalites[i] == 'Authentication') {
      console.log(
        "Veuillez mettre le nom de l'entité pour la fonctionnalité " +
          f.fonctionnalites[i]
      )
      creerunrepertoir(np.projectName)

      //-------Chargement de la fonctionnalité
      exec('svn checkout https://github.com/morseck00/BirahimTry/trunk/Authentification',{
          cwd: './' + np.projectName
        }
      )
      const ne  = await inquirer.prompt(nomEntite)
      const ad  = await inquirer.prompt(attributeadd)
      const rep = ad.attributeaddname

      //-------bracket pour commencé le fichier yml
      let ouverture = '{\n'
      creerunfichier('./' +np.projectName +'/Authentification/models/' +ne.entityName +'.yml',ouverture)

      while (rep == 'O') {
        const an  = await inquirer.prompt(attributeName)
        const at  = await inquirer.prompt(attributeType)
        const re  = await inquirer.prompt(attributeRequire)
        const au  = await inquirer.prompt(attributeunique)
        const ad2 = await inquirer.prompt(attributeadd)

        let data =an.attributename_name +': { type: ' +at.type +',required: ' +re.require +', unique: ' +au.unique +'},\n'

        creerunfichier('./' +np.projectName +'/Authentification/models/' +ne.entityName +'.yml',data)

        var dat =an.attributename_name + ': req.body.' + an.attributename_name + ',\n'

        creerunfichier('./' +np.projectName +'/Authentification/routes/inscriptionData.yml',dat)

        var data3 =an.attributename_name +': ' +ne.entityName +'s.' +an.attributename_name +',\n'

        creerunfichier('./' + np.projectName + '/Authentification/routes/loginData.yml',data3)

        if (ad2.attributeaddname == 'n') {
          let fermer = '}'
          creerunfichier('./' +np.projectName +'/Authentification/routes/inscriptionData.yml',fermer)

          creerunfichier('./' + np.projectName + '/Authentification/routes/loginData.yml',fermer)
          break
        }
      }
      //-------bracket pour fermer le fichier yml
      let fermer = '}'
      creerunfichier('./' +np.projectName +'/Authentification/models/' +ne.entityName +'.yml',fermer)

      replace({
        regex      : 'entite',
        replacement: ne.entityName,
        paths: [
          './' + np.projectName + '/Authentification/routes/routefile.js',
          './' + np.projectName + '/Authentification/exporterEntity.js',
          './' + np.projectName + '/Authentification/models/filemodels.js',
          './' + np.projectName + '/Authentification/server.js',
        ],
        recursive: true,
        silent   : true
      })
    }
  }

  let filename = "inscriptionData.js"
  let content  = fs.readFileSync(process.cwd() + "/" + filename).toString()
  
  replace({
    regex      : 'inscriptionData',
    replacement: content,
    paths      : ['./'+np.projectName+'/Authentification/routes/inscriptionData.yml'],
    recursive  : true,
    silent     : true
  })
  
})()
