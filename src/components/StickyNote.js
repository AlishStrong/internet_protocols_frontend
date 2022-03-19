import React from 'react'
import { useState } from 'react'
import '../style/App.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Draggable from 'react-draggable'


const StickyNote = () => {

  const [editState, setEditState] = useState(false)
  const [text, setText] = useState('')
  const [deltaPosition, setDeltaPos] = useState({ x: 0, y:0 })

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition
    setDeltaPos({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    })
  }


  const editLock = () => {
    // user clicks the edit button => editState = false / others can interact
    if(editState){
      setEditState(false)
      console.log('need to set a state for the object in the db rather than local state')
    }
    // user clicks the edit button => state gets editState = true and user can type
    else{
      setEditState(true)
      console.log('need to set a state for the object in the db rather than local state')
    }
  }

  const removeNote = () => {
    // dummy for now
    console.log('Remove note from whiteboard elements')
  }

  const textInput = (e) => {
    console.log('need to set the text in db rather than locally')
    setText(e.target.value)
  }




  return (
    <Draggable handle='strong' onDrag={handleDrag} disabled={!editState}>
      <div className="note" id='note'>
        <strong>
          <div className="header">
            {editState && <p style={ { color : 'white' } }>In edit mode!</p>}
            <p>x: {deltaPosition.x}, y: {deltaPosition.y}</p>
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
