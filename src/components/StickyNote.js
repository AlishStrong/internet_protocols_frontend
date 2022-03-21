import React from 'react'
import '../style/App.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'
import { setEditState,setText,setPos, removeStickyNote, removeNote } from '../reducers/stickyNoteReducer'

const StickyNote = (props) => {

  const dispatch = useDispatch()
  const notes = useSelector(state => state.stickyNote.notes)
  const ind = notes.findIndex(note => note.id === props.id)
  const pos = notes[ind].pos
  const text = notes[ind].text
  const editState = notes[ind].editState

  const whiteboardId = useSelector(state => state.whiteboard)

  const handleDrag = (e, ui) => {
    const { x, y } = pos
    dispatch(setPos({
      id: props.id,
      pos : {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    }))
  }

  const editLock = () => {
    if(editState){
      dispatch(setEditState({ id: props.id, editState: false }))
    }
    else{
      dispatch(setEditState({ id: props.id, editState: true }))
    }
  }

  const deleteNote = () => {
    // need element id
    const id = props.id
    dispatch(removeNote( { id: props.id, whiteboardId: whiteboardId }))
    dispatch(removeStickyNote(  id,whiteboardId ))
  }

  const textInput = (e) => {
    dispatch(setText({ id: props.id, text: e.target.value }))
  }




  return (
    <Draggable handle='strong' onDrag={handleDrag} disabled={!editState}>
      <div className="note" id='note'>
        <strong>
          <div className="header">
            {false && <p style={ { color : 'white' } }>In edit mode!</p>}
            {false && <p>x: {pos.x}, y: {pos.y}</p>}
            <button className="editLock" onClick={editLock}><i className="fas fa-edit"></i></button>
            <button className="delete" onClick={deleteNote}><i className="fas fa-trash-alt"></i></button>
          </div>
        </strong>
        <div className={`main ${editState ? 'hidden' : ''}`}>{text}</div>
        <textarea className={`${editState ? '' : 'hidden'}`} onInput={textInput}></textarea>
      </div>
    </Draggable>
  )
}
export default StickyNote
