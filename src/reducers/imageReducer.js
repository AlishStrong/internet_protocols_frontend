import { createSlice } from '@reduxjs/toolkit'
import { addImageElement, editImage, removeElement, updateElementEditor } from '../services/elementService'

const imageStickySlice = createSlice({
  name: 'imageSticky',
  initialState: { images : [] },
  reducers: {
    setCurrentUser: (state, action) => {
      const id = action.payload.id
      const userId = action.payload.userId
      //console.log(userId)
      let newImages = [...state.images]
      const ind = newImages.findIndex(img => img.id === id)
      newImages[ind].currentUser = userId
      state.images = newImages
    },
    setEditState: (state, action) => {
      const id = action.payload.id
      const editState = action.payload.editState
      let newImages = [...state.images]
      const ind = newImages.findIndex(img => img.id === id)
      newImages[ind].editState = editState
      state.images = newImages
    },
    addComment: (state, action) => {
      const id = action.payload.id
      const comment = action.payload.comment
      let newImages = [...state.images]
      const ind = newImages.findIndex(img => img.id === id)
      newImages[ind].comments = [...newImages[ind].comments , comment ]
      state.images = newImages
    },
    removeComment: (state, action) => {
      let index = action.payload.index
      const id = action.payload.id
      let newImages = [...state.images]
      const ind = newImages.findIndex(img => img.id === id)
      let newComments = newImages[ind].comments
      console.log(ind)
      newComments.splice(index,1)
      newImages[ind].comments = newComments
      state.images = newImages
    },
    setPos: (state, action) => {
      const id = action.payload.id
      const pos = action.payload.pos
      let newImages = [...state.images]
      const ind = newImages.findIndex(img => img.id === id)
      newImages[ind].pos = pos
      state.images = newImages
    },
    addImage: (state, action) => {
      const id = action.payload.id
      const pos = action.payload.pos
      const comments = action.payload.comments
      const editState = action.payload.editState
      const src = action.payload.src
      state.images = [...state.images,{ id: id, pos: pos,src:src, comments: comments, editState: editState, currentUser: 'noUser' }]
    },
    setImages: (state, action) => {
      state.images = action.payload
    },
    removeImage: (state, action) => {
      const id = action.payload.id
      const whiteboardId = action.payload.whiteboardId
      console.log(whiteboardId)
      let newImages = [...state.images]
      const ind = newImages.findIndex(img => img.id === id)
      newImages.splice(ind,1)
      state.images = newImages
    }
  }
})

export const updateImageEditor = (elementId, whiteboardId, userID, editState) => {
  return async () => {
    //console.log(elementId, pos, text, editState, whiteboardId)
    await updateElementEditor(elementId, whiteboardId, userID, editState)
  }
}

export const addStickyImage = (elementId, pos, comments,src, editState, whiteboardId) => {
  return async () => {
    //console.log(elementId, pos, text, editState, whiteboardId)
    await addImageElement(elementId, pos, comments, src , editState, whiteboardId)
  }
}

export const removeImageSticky = (elementId,whiteboardId) => {
  return async () => {
    await removeElement(elementId,whiteboardId)
  }
}

export const editStickyImage = (elementId, whiteboardId, pos, comments) => {
  return async () => {
    //console.log(elementId, pos, text, editState, whiteboardId)
    await editImage(elementId, whiteboardId, pos, comments)
  }
}


export const { setEditState, setPos, addComment, removeComment, setCurrentUser, addImage, setImages, removeImage } = imageStickySlice.actions
export default imageStickySlice.reducer
