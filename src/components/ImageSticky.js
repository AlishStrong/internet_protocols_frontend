import React, { useEffect, useState } from 'react'
import '../style/App.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Draggable from 'react-draggable'
import { Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editStickyImage, updateImageEditor, setEditState, setPos, addComment, removeComment,removeImage, setCurrentUser, removeImageSticky } from '../reducers/imageReducer'


const ImageSticky = (props) => {
  const dispatch = useDispatch()
  const images = useSelector(state => state.imageSticky.images)
  const ind = images.findIndex(img => img.id === props.id)
  const pos = images[ind].pos
  const comments = images[ind].comments
  const src = images[ind].src
  const editState = images[ind].editState
  const currentUser = images[ind].currentUser

  const whiteboardId = useSelector(state => state.whiteboard)
  const userId = useSelector(state => state.user)

  const [blobURL, setBlobURL] = useState()


  useEffect(() => {
    async function parse(){
      const parsed = JSON.parse(src)
      //console.log(parsed)
      const blob = await fetch(parsed.blob).then(res => res.blob())
      const imgsrc = URL.createObjectURL(blob)
      setBlobURL(imgsrc)
    }
    parse()
  },[])


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
    // if in edit / only current editor can switch out of edit => set user to undefined
    if(editState && (currentUser === userId || currentUser === 'noUser' || currentUser === undefined)){
      dispatch(setEditState({ id: props.id, editState: false }))
      dispatch(setCurrentUser({ id: props.id, currentUser: 'noUser' }))
      dispatch(editStickyImage(props.id,whiteboardId,pos,comments))
      dispatch(updateImageEditor(props.id,whiteboardId,'noUser',false))
    }
    else{
      // if not in edit => set in edit & set current user
      dispatch(setEditState({ id: props.id, editState: true }))
      dispatch(setCurrentUser({ id: props.id, currentUser: userId }))
      dispatch(updateImageEditor(props.id,whiteboardId,userId,true))
    }
  }


  // need to be refactored to not use local state
  const newComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    dispatch(addComment({ id:props.id,comment:comment }))
  }

  const deleteComment = (e) => {
    const index = e.target.id
    dispatch(removeComment({ id:props.id,index: index }))
  }

  const deleteImage = () => {
    dispatch(removeImage({ id: props.id, whiteboardId: whiteboardId }))
    dispatch(removeImageSticky(  props.id,whiteboardId ))
  }


  //const resizeStyle = editState ? 'both' : 'none'
  // can be resizeable but wasn't really a requirement so no need for extra work ?
  return (
    <Draggable handle='strong' onDrag={handleDrag} disabled={!editState}>
      <div className="note" id='note' style={ { overflow:'auto' } }>
        <strong>
          <div className="header">
            <button className="editLock" onClick={editLock}><i className="fas fa-edit"></i></button>
            <button className="delete" onClick={deleteImage}><i className="fas fa-trash-alt"></i></button>
          </div>
        </strong>
        <Image src={blobURL} fluid={true}></Image>
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
