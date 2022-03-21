import { createSlice } from '@reduxjs/toolkit'
import { removeElement, addElement } from '../services/elementService'

const stickyNoteSlice = createSlice({
  name: 'stickyNote',
  initialState: { notes : [] },
  reducers: {
    setEditState: (state, action) => {
      const id = action.payload.id
      const editState = action.payload.editState
      let newNotes = [...state.notes]
      const ind = newNotes.findIndex(note => note.id === id)
      newNotes[ind].editState = editState
      state.notes = newNotes
    },
    setText: (state, action) => {
      const id = action.payload.id
      const text = action.payload.text
      let newNotes = [...state.notes]
      const ind = newNotes.findIndex(note => note.id === id)
      newNotes[ind].text = text
      state.notes = newNotes
    },
    setPos: (state, action) => {
      const id = action.payload.id
      const pos = action.payload.pos
      let newNotes = [...state.notes]
      const ind = newNotes.findIndex(note => note.id === id)
      newNotes[ind].pos = pos
      state.notes = newNotes
    },
    addNote: (state, action) => {
      const id = action.payload.id
      const pos = action.payload.pos
      const text = action.payload.text
      const editState = action.payload.editState
      state.notes = [...state.notes,{ id: id, pos: pos, text: text, editState: editState }]
    },
    removeNote: (state, action) => {
      const id = action.payload.id
      const whiteboardId = action.payload.whiteboardId
      console.log(whiteboardId)
      let newNotes = [...state.notes]
      const ind = newNotes.findIndex(note => note.id === id)
      newNotes.splice(ind,1)
      state.notes = newNotes
    }
  }
})

export const removeStickyNote = (elementId,whiteboardId) => {
  return async () => {
    await removeElement(elementId,whiteboardId)
  }
}

export const addStickyNote = (elementId, pos, text, editState, whiteboardId) => {
  return async () => {
    //console.log(elementId, pos, text, editState, whiteboardId)
    await addElement(elementId, pos, text, editState, whiteboardId)
  }
}


export const { setEditState, setPos, setText, addNote, removeNote } = stickyNoteSlice.actions
export default stickyNoteSlice.reducer
