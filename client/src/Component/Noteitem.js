import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'


const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (

        <div className="col-md-3" >

            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h4 className="card-title">{note.title}</h4>
                        <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); showAlert("Deleted note successfully!", "success"); }}></i>
                    </div>
                    <hr />
                    <h5 className="card-text">{note.description} </h5>
                    
                    <hr />
                    <h6 className="card-text">{note.tag} </h6>
                    <hr />
                    <p className="card-text">{note.date} </p>
                </div>
            </div>
        </div >
    )
}

export default Noteitem;
