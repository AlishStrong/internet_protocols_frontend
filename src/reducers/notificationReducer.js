import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload)
    },
    removeNotification: (state, action) => {
      return state.filter((n, index) => index !== action.payload)
    }
  }
})

export const notify = (type, message, title) => {
  return async dispatch => {
    dispatch(addNotification({ type, message, title }))
  }
}

export const completeNotification = (notificationId) => {
  return async dispatch => {
    dispatch(removeNotification(notificationId))
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
