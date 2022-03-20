import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import whiteboardReducer from './reducers/whiteboardReducer'
import canvasReducer from './reducers/canvasReducer'

const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    notifications: notificationReducer,
    canvas: canvasReducer,
  }
})

export default store
