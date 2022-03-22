import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uid } from 'uid'
import { addImage, addStickyImage } from '../reducers/imageReducer'
import { addNote, addStickyNote } from '../reducers/stickyNoteReducer'
import '../style/App.css'
import ImageSticky from './ImageSticky'
import StickyNote from './StickyNote'

const Toolbar = () => {
  const whiteboardId = useParams().whiteboardId
  const stickyNotes = useSelector(state => state.stickyNote.notes)
  const userId = useSelector(state => state.user.userId)

  const images = useSelector(state => state.imageSticky.images)
  const dispatch = useDispatch()

  const createStickyNote = () => {
    let id = uid(10)
    dispatch(addNote({
      id: id,
      key: stickyNotes.length,
      text: '',
      pos: { x: 0, y: 0 },
      editState : false
    }))
    dispatch(addStickyNote(id, { x: 0, y: 0 } , '' , false ,whiteboardId))
  }

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        resolve(reader.result)
      }
    })
  }

  const createImage  = async (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0]
      const b64 = await blobToBase64(img)
      const jsonString = JSON.stringify({ blob: b64 })
      //console.log(jsonString)
      let src = jsonString
      let id = uid(10)
      dispatch(addImage({
        id: id,
        key: images.length,
        src: src,
        comments: [],
        pos: { x: 0, y: 0 },
        editState : false
      }))
      dispatch(addStickyImage(id, { x: 0, y: 0 } , [] , src , false ,whiteboardId, userId))
    }
  }


  //console.log(images)
  return (
    <>
      <div className='toolbar'>
        <Button onClick={createStickyNote}>Add sticky note</Button>
        {stickyNotes.length > 0 && stickyNotes.map(note => (
          <StickyNote
            key={note.key}
            id={note.id}
            value={note.text}
            pos={note.pos}
            editState={note.editState}
          />
        ))}
        <Form.Group onChange={createImage} controlId="formFileSm" className="mb-3">
          <Form.Label>Add an image</Form.Label>
          <Form.Control accept='image/jpeg, image/png' type="file" size="sm" />
        </Form.Group>
        {images.length > 0 && images.map(img => (
          <ImageSticky
            key={img.key}
            id={img.id}
            pos={img.pos}
            editState={img.editState}
          />
        ))}
      </div>
    </>
  )
}

export default Toolbar
