//importation des modules que j'ai installé
const chalk    = require('chalk')
const clear    = require('clear')
const inquirer = require('inquirer')
const figlet   = require('figlet')
const shell    = require('shelljs')
const fs       = require('fs')


//Affichage du nom du Programme
clear ()
console.log(
  chalk.green(
    figlet.textSync('PROTO-BOX',{ horizontalLayout: 'fitted'})
  )
)
console.log(
  chalk.green('Bienvenue dans la CLI de Proto-Box')
)

//Questions
const initquestions=[
  {
    type   : 'list',
    name   : 'action',
    message: chalk.yellow('Veuillez faire un choix'),
    choices: ['Backup', 'Restore'],
    default: 'Backup',
  }
]; 
//backup questions
const backupQuestions=[
  {
    type   : 'input',
    name   : 'host',
    message: 'Hostname',
    default: 'localhost',
  },
  {
    type   : 'input',
    name   : 'port',
    message: 'Port',
    default: '27017',
  },
  {
    type    : 'input',
    name    : 'database',
    message : 'Database name',
    validate: (input) => {
      return new Promise((resolve, reject)=>{
        if(!input.length){
          reject('Veuillez mettre le nom de la base de données')
        }
        resolve(true)
      })
    }
  },
  {
    type    : 'input',
    name    : 'collection',
    message : 'Collection name',
    validate: (input) => {
      return new Promise((resolve, reject)=>{
        if(!input.length){
          reject('Veuillez mettre le nom de la Collection')
        }
        resolve(true)
      })
    }
  },
  {
    type   : 'input',
    name   : 'output',
    message: 'output directory',
    default: `${process.cwd()}/dump`
  },
]
//restore  questions
const restoreQuestions=[
  {
    type   : 'input',
    name   : 'host',
    message: 'Hostname',
    default: 'localhost',
  },
  {
    type   : 'input',
    name   : 'port',
    message: 'Port',
    default: '27017',
  },
  {
    type    : 'input',
    name    : 'database',
    message : 'Database name',
    validate: (input) => {
      return new Promise((resolve, reject)=>{
        if(!input.length){
          reject('Veuillez mettre le nom de la base de données')
        }
        resolve(true)
      })
    }
  },
  {
    type    : 'input',
    name    : 'collection',
    message : 'Collection name',
    validate: (input) => {
      return new Promise((resolve, reject)=>{
        if(!input.length){
          reject('Veuillez mettre le nom de la Collection')
        }
        resolve(true)
      })
    }
  },

  {
    type   : 'input',
    name   : 'source',
    message: 'source directory',
    //default: `${ process.cwd()}/dump`
  },
]

;(async()=>{
  this.restore = restore
  this.backup  = backup

 // const BackupRestore=await inquirer.prompt(initquestions)
  
  //await this[BackupRestore.action.toLowerCase()]()

  async function restore(){
    await setDefaultValues()
    const { host, port, database, collection, source } = await inquirer.prompt(restoreQuestions)

    let command            = ['mongorestore']
    host && (command       = command.concat(['-h', host]))
    port && (command       = command.concat(['-p', port]))
    database && (command   = command.concat(['-d', database]))
    collection && (command = command.concat(['-c', collection]))
    source && (command     = command.concat([source]))

    //pour sauter une ligne
    shell.echo('\n')
      try {
          await shell.exec(command.join(' '))
          shell.echo(`${chalk.green('BYYYYYYYYYYYYYYYY')}`)
      } catch (e) {
        shell.echo (`${chalk.green(e)}`)
        shell.exit(0)
      }
     console.log('command', command.join(` `))

  }

  ;async function backup(){
    const { host, port, database, collection, output } = await inquirer.prompt(backupQuestions)
    let command            = ['mongodump']
    host && (command       = command.concat(['-h', host]))
    port && (command       = command.concat(['-p', port]))
    database && (command   = command.concat(['-d', database]))
    collection && (command = command.concat(['-c', collection]))
    output && (command     = command.concat(['-o', output]))

    //pour sauter une ligne
    shell.echo('\n')
      try {
          await shell.exec(command.join(' '))
          shell.echo(`${chalk.green('BYYYYYYYYYYYYYYYY')}`)
      } catch (e) {
        shell.echo (`${chalk.green(e)}`)
        shell.exit(0)
      }
     // console.log('command', command.join(` `))
  }
  async function setDefaultValues(){
    const path= [process.cwd(), '/dump']
    const dumpFolderExists=fs.existsSync(path.join(''))

    if(!dumpFolderExists){
      return
    }

    const dumpDir =fs.readdirSync(path.join(''))
    if(!dumpDir.length){
      return
    }
    path.push(`/${dumpDir[0]}`)
    const dbSubFolders= fs.readdirSync(path.join(''))
   
    if(!dbSubFolders.length){
      return
    }
    const dbIndex =restoreQuestions.findIndex(question=> question.name === 'database')
    const collectionIndex=restoreQuestions.findIndex(question=> question.name ==='collection')
    const sourceIndex=restoreQuestions.findIndex(question=> question.name ==='source')

    const collection=dbSubFolders[0].split('.')[0]
    const db = dumpDir[0]
    const source =`${process.cwd}/dump/${db}/${collection}.bson`
    restoreQuestions[dbIndex]['default']=db
    restoreQuestions[collectionIndex]['default']=collection
    restoreQuestions[sourceIndex]['default']=source

  }
})()