const router = require('express').Router();
const { notes, nextId } = require('../../db/db.json');
const { addNewNote, validateNote, deleteNote } = require('../../lib/notes');

//get route
router.get('/notes', (req, res) => {
    res.json(notes)
});

//post route
router.post('/notes', (req, res) => {
    //unique id
    req.body.id = nextId;
    //validate format
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        //validation success, to add new note
        const note = addNewNote(req.body, notes);
        res.json(req.body);
    }
});

//delete route
router.delete('/notes/:id', (req, res) => {
    //id from query
    let deleteId = parseInt(req.params.id);
    //look for index
    let deleteIndex = notes.findIndex((x) => {
        return x.id === deleteId;
    });

    if (deleteIndex === -1) {
    res.sendStatus(404);
    }
    else {
        deleteNote(deleteIndex, notes, nextId)
        res.status(200).json({
            code: 200,
            message: 'Note has been Deleted',
            noteId: deleteId
        });
    }
});

module.exports = router;