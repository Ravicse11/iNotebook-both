const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const jwt = require('jsonwebtoken');


const Note = require('../models/Note.js')

router.get('/fetchallnote', fetchuser, async (req, res) => {

    try {
      
        const note = await Note.find({ user: req.user.id })
        res.json(note);
    } catch (error) {
        console.log(err);
        res.send({ err: "this is  error" });
    }

});
router.post('/savenote', fetchuser, [
    //name must be present
    body('title', 'enter the valid name').isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('description', 'enter the  description of minimum length should be five').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note({ title, description, tag, user: req.user.id });
        const saveNote = await note.save();
        res.json(saveNote);
        
    } catch (error) {
      
        console.log(error);
        res.json({success, err: "this is  error" });
    }

});
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("you cannot do it");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("you cannot do it");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error)
        res.send({ err: "there is something error" });
    }

});

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("you cannot do it");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("you cannot do it");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success": "note delete successfully", note: "note" });
    } catch (error) {
        //console.log(err);
        res.send({ err: "there is something   error" });
    }

})

module.exports = router