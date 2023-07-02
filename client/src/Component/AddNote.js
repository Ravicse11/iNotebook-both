import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleChange = (e) => {
        e.preventDefault();
        console.log("I am going to add note");
        if(!note.title)   props.showAlert("Invalid credentials", "danger");
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added Note successfully!", "success");
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className='container my-3'>
                <div className="container col-8">
                <h2>ADD YOUR NOTES</h2>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description"  name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button className="btn btn-primary" onClick={handleChange} >Add Note</button>
                </div>
            </div>
        </div>
    )
}

export default AddNote
