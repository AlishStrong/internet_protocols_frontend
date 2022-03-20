import React from 'react'
import '../style/App.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Draggable from 'react-draggable'
import { Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setEditState, setPos, addComment, removeComment,removeImage } from '../reducers/imageReducer'


const ImageSticky = (props) => {
  const dispatch = useDispatch()
  const editState = useSelector(state => state.imageSticky.editState)
  const comments = useSelector(state => state.imageSticky.comments)
  const pos = useSelector(state => state.imageSticky.pos)

  // pass the file that was input as a prop for the Image elements src
  const image = props.image

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


  // need to be refactored to not use local state
  const newComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(addComment(comment))
  }

  const deleteComment = (e) => {
    const index = e.target.id
    dispatch(removeComment(index))
  }

  const deleteImage = () => {
    dispatch(removeImage())
  }


  //const resizeStyle = editState ? 'both' : 'none'
  // can be resizeable but wasn't really a requirement so no need for extra work ?
  return (
    <Draggable handle='strong' onDrag={handleDrag} disabled={!editState}>
      <div className="note" id='note' style={ { overflow:'auto' } }>
        <strong>
          <div className="header">
            <p>x: {pos.x},y: {pos.y}</p>
            {editState && <p style={ { color : 'white' } }>In edit mode!</p>}
            <button className="editLock" onClick={editLock}><i className="fas fa-edit"></i></button>
            <button className="delete" onClick={deleteImage}><i className="fas fa-trash-alt"></i></button>
          </div>
        </strong>
        <Image src={image} fluid={true}></Image>
        <div className='commentField'>
          {editState && <form onSubmit={newComment}>
            <label>Comment:
              <input type={'text'} name="comment"></input>
            </label>
            <input type="submit"/>
          </form>}

          <div id='comments'>
            Comments (remove comment by clicking while in edit mode)
            <ul>
              {comments.map( (comment,idx) => {
                return (<li id={idx} onClick={deleteComment} key={idx}>{comment}</li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
export default ImageSticky
