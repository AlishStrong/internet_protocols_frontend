import { createSlice } from '@reduxjs/toolkit'

const imageStickySlice = createSlice({
  name: 'imageSticky',
  initialState: {
    editState : false,
    comments : [],
    pos : { x: 0, y:0 }
  },
  reducers: {
    setEditState: (state, action) => {
      state.editState = action.payload
    },
    addComment: (state, action) => {
      state.comments = [...state.comments , action.payload ]
    },
    removeComment: (state, action) => {
      let index = action.payload
      let newComments = [...state.comments]
      newComments.splice(index,1)
      state.comments = newComments
    },
    removeImage: (state, action) => {
      // remove the whole element
      return action.payload
    },
    setPos: (state, action) => {
      state.pos = action.payload
    }
  }
})


export const { setEditState, setPos, addComment, removeComment,removeImage } = imageStickySlice.actions
export default imageStickySlice.reducer
