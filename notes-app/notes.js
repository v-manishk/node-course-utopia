const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) => note.title === title)     // runs the entire list for duplicate even if it find the duplicate in array
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })    
        saveNotes(notes)
        console.log(chalk.green.inverse.bold('New Note Added'))
    } else {
        console.log(chalk.red.inverse.bold('Note Title Taken'))
    }   
}

const removeNote = (title) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title !== title)

    if (duplicateNotes.length < notes.length) {
        saveNotes(duplicateNotes)
        console.log(chalk.green.inverse.bold('Note Removed: ' + title))
    } else {
        console.log(chalk.red.inverse.bold('Note Title Not Found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(notes)

    notes.forEach(note => console.log(chalk.green.bold('\nTitle: ') + note.title + chalk.blue.bold('\nBody: ') + note.body));
}

const readNotes = function(title) {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) => note.title === title)
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.green.bold('Note for Title: ') + chalk.underline.bold(title) + chalk.blue.bold('\nBody: ') + note.body)
    } else {
        console.log(chalk.red.inverse.bold('Note Not Found'))
    }
}

const saveNotes = (notes) => {
    const dataJ = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJ)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}