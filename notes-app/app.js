// const utilss = require('./utils.js')
// const sum = utilss(9, 10)
// console.log(sum)

// const validator = require('validator')
// const chalk = require('chalk')
// const yargs = require('yargs')
// const notes = require('./notes.js')

// console.log(notes()) 

// console.log(validator.isEmail('manish@manish.manish'))

// console.log(validator.isURL('https/manish@.manish'))

// console.log(chalk.red.inverse.bold("ManishKumar Vishwakarma"))

// const input = process.argv[2]

// console.log('Hello!, ' + input)

// if (input === 'Manish') {
//     console.log('Your age is 22')
// } else if (input === 'Vishal') {
//     console.log('Your age is 21')
// } else {
//     console.log('Sorry ' + input + ', your age not known!')
// }

const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js') 

yargs.version('1.1.0')

// creating the add command
yargs.command({
    command: 'add',
    describe: 'Add a new Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,  // to set that title is required
            type: 'string'  // make sure that title is always string
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
        // console.log('Adding a new note!', argv)
        // console.log('Title: ' + argv.title)
        // console.log('Body: ' + argv.body)
    }
})

// creating the remove command
yargs.command({
    command: 'remove',
    describe: 'Remove the Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

// creating the list command
yargs.command({
    command: 'list',
    describe: 'List Notes',
    handler() {
        notes.listNotes()
    }
})

// creating the read command
yargs.command({
    command: 'read',
    describe: 'Read Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
    }
})

// console.log(yargs.argv)
// insted of using that we can use the 
yargs.parse()