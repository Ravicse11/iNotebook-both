
import React, { useState } from 'react';
import NoteContext from './NoteContext.js';

const NoteState = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://inotebookbackend-9on4.onrender.com";
    const initial = [];
    const [notes, setNotes] = useState(initial);

    //Fetch all Notes
    const getNotes = async () => {

        const url = `${host}/api/note/fetchallnote`

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                // "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZTcyNzIyMGY4MDE5YWFkZTFiZGMyIn0sImlhdCI6MTY3NDQ3NDE0MH0.VBq_KCUcQpf122eLya9f4aJrY1vAPPkz_p6PFluBKMI'
            }

        });
        const json = await response.json();
        setNotes(json);


    }

    //Add note
    const addNote = async (title, description, tag) => {

        const url = `${host}/api/note/savenote`;

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                //"auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZTcyNzIyMGY4MDE5YWFkZTFiZGMyIn0sImlhdCI6MTY3NDQ3NDE0MH0.VBq_KCUcQpf122eLya9f4aJrY1vAPPkz_p6PFluBKMI'
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });
     
        
        const note = await response.json();
      
        setNotes(notes.concat(note));
    }
    //Delete note
    const deleteNote = async (id) => {
        const url = `${host}/api/note/deletenote/${id}`

        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
                //"auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZTcyNzIyMGY4MDE5YWFkZTFiZGMyIn0sImlhdCI6MTY3NDQ3NDE0MH0.VBq_KCUcQpf122eLya9f4aJrY1vAPPkz_p6PFluBKMI'
            }
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);

    }


    //Update note
    const editNote = async (id, title, description, tag) => {
        //api call
        const url = `${host}/api/note/updatenote/${id}`

        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
                //"auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZTcyNzIyMGY4MDE5YWFkZTFiZGMyIn0sImlhdCI6MTY3NDQ3NDE0MH0.VBq_KCUcQpf122eLya9f4aJrY1vAPPkz_p6PFluBKMI'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        //updation
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;