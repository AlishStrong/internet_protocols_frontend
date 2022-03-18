import { createSlice } from '@reduxjs/toolkit'
import sessionService from '../services/sessionService'

const sessionSlice = createSlice({
  name: 'session',
  initialState: {},
  reducers: {
    createSession: (state, action) => {
      return action.payload
    }
  }
})

export const initializeSession = (sessionInfo, creatorName) => {
  return async dispatch => {
    const session = await sessionService.createSession(sessionInfo, creatorName)
    dispatch(createSession(session))
  }
}

export const { createSession } = sessionSlice.actions
export default sessionSlice.reducer
