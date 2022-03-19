import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import whiteboardReducer from './reducers/whiteboardReducer'

const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    notifications: notificationReducer
  }
})

export default store
