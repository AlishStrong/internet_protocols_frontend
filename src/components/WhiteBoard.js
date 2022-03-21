import React, { useRef } from 'react'
import { Container,Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Canvas from '../components/Canvas'
import SaveWhiteboard from '../components/SaveWhiteboard'
import AddImage from '../components/AddImage'
import '../style/App.css'
import StickyNote from './StickyNote'
import { useDispatch } from 'react-redux'
import { addNote } from '../reducers/stickyNoteReducer'
import { useSelector } from 'react-redux'
import { uid } from 'uid'

const Whiteboard = () => {
  const whiteboardId = useParams().whiteboardId
  const rootRef = useRef(null)
  const stickyNotes = useSelector(state => state.stickyNote.notes)
  const dispatch = useDispatch()

  const createStickyNote = () => {
    dispatch(addNote({
      id: uid(10),
      key: stickyNotes.length,
      text: '',
      pos: { x: 0, y: 0 },
      editState : false
    }))
  }

  return (
    <>
      <div className='toolbar'>
        <Button onClick={createStickyNote}>Add sticky note</Button>
        <AddImage/>
        {stickyNotes.length > 0 && stickyNotes.map(note => (
          <StickyNote
            key={note.key}
            id={note.id}
            value={note.text}
            pos={note.pos}
            editState={note.editState}
          />
        ))}
      </div>

      <SaveWhiteboard rootNode={rootRef.current}>
      </SaveWhiteboard>
      <Container style={{ backgroundColor: 'white' }} ref={rootRef}>
        Welcome to the whiteboard {whiteboardId}
        <Canvas>
        </Canvas>
      </Container>

    </>
  )
}

export default Whiteboard
