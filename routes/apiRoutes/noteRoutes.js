const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { addNewNote, validateNote } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    res.json(notes)
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    }
    else {
        const note = addNewNote(req.body, notes);
        res.json(req.body);
    }
});

module.exports = router;