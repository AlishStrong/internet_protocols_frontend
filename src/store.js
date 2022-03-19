import { configureStore } from '@reduxjs/toolkit'
import canvasReducer from './reducers/canvasReducer'
import imageReducer from './reducers/imageReducer'
import notificationReducer from './reducers/notificationReducer'
import stickyNoteReducer from './reducers/stickyNoteReducer'
import userReducer from './reducers/userReducer'
import whiteboardReducer from './reducers/whiteboardReducer'

const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    notifications: notificationReducer,
    user: userReducer,
    canvas: canvasReducer,
    stickyNote: stickyNoteReducer,
    imageSticky: imageReducer
  }
})

export default store
