const fs = require('fs');
const path = require('path');

// new note
function addNewNote(body, notesArr) {
    const note = body;
    notesArr.push(note);
    // increase id
    let nextId = parseInt(note.id) + 1;
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'), 
        JSON.stringify({ notes: notesArr, nextId}, null, 2)
    );
    return note;
}

// validate note format
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

//note deletion
function deleteNote(index, notesArr, nextId) {
    //splice index
    notesArr.splice(index, 1);
    //rewrite file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArr, nextId }, null, 2)
    );
    return;
}

module.export = {
    validateNote, 
    addNewNote, 
    deleteNote,
};