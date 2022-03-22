import { createSlice } from '@reduxjs/toolkit'

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    isDrawing: false,
    isErasing: false,
    strokes: [],
    currentDrawing: [],
    shouldRedraw: false,
    wsUpdate: false
  },
  reducers: {
    setDrawing: (state, action) => {
      state.isDrawing = action.payload
    },
    setErase: (state, action) => {
      state.isErasing = action.payload
    },
    pushStroke: (state, action) => {
      state.strokes.push(action.payload)
    },
    undoStroke: (state) => {
      state.strokes.pop()
      state.shouldRedraw = true
    },
    setRedraw: (state, action) => {
      state.shouldRedraw = action.payload
    },
    pushPoint: (state, action) => {
      state.currentDrawing.push(action.payload)
    },
    clearCurrent: (state) => {
      state.currentDrawing = []
    },
    updateStrokes: (state, action) => {
      state.strokes = action.payload
    },
    updateWsUpdate: (state, action) => {
      state.wsUpdate = action.payload
    }
  }
})


export const { setDrawing, setErase, pushStroke, undoStroke, pushPoint, clearCurrent, setRedraw, updateStrokes, updateWsUpdate } = canvasSlice.actions
export default canvasSlice.reducer
