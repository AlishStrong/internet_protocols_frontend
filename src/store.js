import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import whiteboardReducer from './reducers/whiteboardReducer'
import stickyNoteReducer from './reducers/stickyNoteReducer'
import imageReducer from './reducers/imageReducer'

const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    notifications: notificationReducer,
    stickyNote: stickyNoteReducer,
    imageSticky: imageReducer
  }
})

export default store
