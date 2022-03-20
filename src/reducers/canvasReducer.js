import { createSlice } from '@reduxjs/toolkit'
import updateCanvasReq from '../services/canvasService'

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    isDrawing: false,
    isErasing: false,
    strokes: [],
    currentDrawing: [],
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
    popStroke: (state) => {
      state.strokes.pop()
    },
    pushPoint: (state, action) => {
      state.currentDrawing.push(action.payload)
    },
    clearCurrent: (state) => {
      state.currentDrawing = []
    }
  }
})

export const updateCanvas = (strokes, whiteboardId) => {
  return async () => {
    await updateCanvasReq(strokes, whiteboardId)
  }
}


export const { setDrawing, setErase, pushStroke, popStroke, pushPoint, clearCurrent } = canvasSlice.actions
export default canvasSlice.reducer
