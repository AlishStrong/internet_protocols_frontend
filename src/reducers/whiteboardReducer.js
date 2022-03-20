import { createSlice } from '@reduxjs/toolkit'
import whiteboardService from '../services/whiteboardService'
import { notify } from './notificationReducer'
import { setUserDispatcher } from './userReducer'

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState: '',
  reducers: {
    createWhiteboard: (state, action) => {
      return action.payload
    },
    closeWhiteboard: () => null
  }
})

export const initializeWhiteboard = (payload) => {
  return async dispatch => {
    const { whiteboardId, error, token } = await whiteboardService.createWhiteboard(payload)
    if (whiteboardId && token) {
      await dispatch(setUserDispatcher({ token, status: 'host' }))
      await dispatch(createWhiteboard(whiteboardId))
      await dispatch(notify('success', `Your token ${token}`, `Whiteboard ${whiteboardId} was successfully created`))
    } else {
      const { message, title } = error
      dispatch(notify('danger', message, title))
    }
  }
}

export const closeWhiteboardDispatcher = () => async dispatch => dispatch(closeWhiteboard())

export const { createWhiteboard, closeWhiteboard } = whiteboardSlice.actions
export default whiteboardSlice.reducer
