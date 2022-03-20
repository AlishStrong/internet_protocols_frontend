import { createSlice } from '@reduxjs/toolkit'

const stickyNoteSlice = createSlice({
  name: 'stickyNote',
  initialState: {
    editState : false,
    text : '',
    pos : { x: 0, y:0 }
  },
  reducers: {
    setEditState: (state, action) => {
      state.editState = action.payload
    },
    setText: (state, action) => {
      state.text = action.payload
    },
    removeNote: (state, action) => {
      // whole element needs to be removed
      return action.payload
    },
    setPos: (state, action) => {
      state.pos = action.payload
    }
  }
})


export const { setEditState, setPos, setText, removeNote  } = stickyNoteSlice.actions
export default stickyNoteSlice.reducer
