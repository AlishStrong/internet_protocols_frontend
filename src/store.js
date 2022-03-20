import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import whiteboardReducer from './reducers/whiteboardReducer'
import stickyNoteReducer from './reducers/stickyNoteReducer'

const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    notifications: notificationReducer,
    stickyNote: stickyNoteReducer
  }
})

export default store
