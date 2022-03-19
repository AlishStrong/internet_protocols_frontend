import React from 'react'
import { useState } from 'react'
import '../style/App.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Draggable from 'react-draggable'
import { Image } from 'react-bootstrap'

const ImageSticky = () => {
  const [editState, setEditState] = useState(false)
  const [comments, setComments] = useState([])
  const [pos, setPos] = useState({ x: 0, y:0 })

  const handleDrag = (e, ui) => {
    const { x, y } = pos
    setPos({
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


  // need to be refactored to not use local state
  const addComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    setComments([...comments, comment ])
  }

  const removeComment = (e) => {
    const index = e.target.id
    let newComments = [...comments]
    newComments.splice(index,1)
    setComments(newComments)
  }


  //const resizeStyle = editState ? 'both' : 'none'
  // can be resizeable but wasn't really a requirement so no need for extra work ?

  // currently using random image as src, img needs to be passed as prop i guess
  return (
    <Draggable handle='strong' onDrag={handleDrag} disabled={!editState}>
      <div className="note" id='note' style={ { overflow:'auto' } }>
        <strong>
          <div className="header">
            <p>x: {pos.x},y: {pos.y}</p>
            {editState && <p style={ { color : 'white' } }>In edit mode!</p>}
            <button className="editLock" onClick={editLock}><i className="fas fa-edit"></i></button>
            <button className="delete" onClick={() => {}}><i className="fas fa-trash-alt"></i></button>
          </div>
        </strong>
        <Image src='https://mdbootstrap.com/img/new/slides/041.webp' fluid={true}></Image>
        <div className='commentField'>
          {editState && <form onSubmit={addComment}>
            <label>Comment:
              <input type={'text'} name="comment"></input>
            </label>
            <input type="submit"/>
          </form>}

          <div id='comments'>
            Comments (remove comment by clicking while in edit mode)
            <ul>
              {comments.map( (comment,idx) => {
                return (<li id={idx} onClick={removeComment} key={idx}>{comment}</li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
export default ImageSticky
