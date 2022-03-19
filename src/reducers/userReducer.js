import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: window.localStorage.getItem('userToken'),
  reducers: {
    setUser: (state, action) => {
      window.localStorage.setItem('userToken', action.payload)
      return action.payload
    }
  }
})

export const setUserDispatcher = (user) => {
  return async dispatch => dispatch(setUser(user))
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
