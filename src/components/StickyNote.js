import React from 'react'
import '../style/App.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'
import { setEditState,setText,setPos } from '../reducers/stickyNoteReducer'

const StickyNote = () => {
  const dispatch = useDispatch()
  const editState = useSelector(state => state.stickyNote.editState)
  const text = useSelector(state => state.stickyNote.text)
  const pos = useSelector(state => state.stickyNote.pos)

  const handleDrag = (e, ui) => {
    const { x, y } = pos
    dispatch(setPos({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    }))
  }

  const editLock = () => {
    if(editState){
      dispatch(setEditState(false))
    }
    else{
      dispatch(setEditState(true))
    }
  }

  const removeNote = () => {
    // dummy for now
    console.log('Remove note from whiteboard elements')
  }

  const textInput = (e) => {
    dispatch(setText(e.target.value))
  }




  return (
    <Draggable handle='strong' onDrag={handleDrag} disabled={!editState}>
      <div className="note" id='note'>
        <strong>
          <div className="header">
            {editState && <p style={ { color : 'white' } }>In edit mode!</p>}
            <p>x: {pos.x}, y: {pos.y}</p>
            <button className="editLock" onClick={editLock}><i className="fas fa-edit"></i></button>
            <button className="delete" onClick={removeNote}><i className="fas fa-trash-alt"></i></button>
          </div>
        </strong>
        <div className={`main ${editState ? 'hidden' : ''}`}>{text}</div>
        <textarea className={`${editState ? '' : 'hidden'}`} onInput={textInput}></textarea>
      </div>
    </Draggable>
  )
}
export default StickyNote
