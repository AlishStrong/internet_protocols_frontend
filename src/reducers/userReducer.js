import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(window.localStorage.getItem('userJSON')),
  reducers: {
    setUser: (state, action) => {
      window.localStorage.setItem('userJSON', JSON.stringify(action.payload))
      return action.payload
    }
  }
})

export const setUserDispatcher = (userData) => async dispatch => dispatch(setUser(userData))

export const { setUser } = userSlice.actions
export default userSlice.reducer
