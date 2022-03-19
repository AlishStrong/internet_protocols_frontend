import { createSlice } from '@reduxjs/toolkit'

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState: null,
  reducers: {
    setWhiteboard: (state, action) => {
      return action.payload
    },
    closeWhiteboard: () => null
  }
})

export const setWhiteboardDispatcher = (whiteboard) => async dispatch => dispatch(setWhiteboard(whiteboard))

export const closeWhiteboardDispatcher = () => async dispatch => dispatch(closeWhiteboard())

export const { setWhiteboard, closeWhiteboard } = whiteboardSlice.actions
export default whiteboardSlice.reducer
