import { configureStore } from '@reduxjs/toolkit'
import canvasReducer from './reducers/canvasReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import whiteboardReducer from './reducers/whiteboardReducer'

const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    notifications: notificationReducer,
    user: userReducer,
    canvas: canvasReducer
  }
})

export default store
