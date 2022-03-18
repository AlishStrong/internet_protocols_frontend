import React from 'react'
import { useDispatch } from 'react-redux'
import { initializeSession } from '../reducers/sessionReducer'

const CreateSession = () => {
  const dispatch = useDispatch()

  const createSession = async (event) => {
    event.preventDefault()
    const sessionInfo = {
      name: event.target.sessionName.value,
      password: event.target.sessionPassword.value
    }
    const creatorName = event.target.creatorName.value

    event.target.creatorName.value = ''
    event.target.sessionName.value = ''
    event.target.sessionPassword.value = ''

    dispatch(initializeSession(sessionInfo, creatorName))
  }

  return (
    <div>
      <h2>Create a new session</h2>
      <form onSubmit={createSession}>
        <div>
          Your name
          <input name='creatorName' />
        </div>
        <div>
          Session name
          <input name='sessionName' />
        </div>
        <div>
          Session password
          <input name='sessionPassword' />
        </div>
        <div>
          <button type='submit'>create session</button>
        </div>
      </form>
    </div>
  )
}

export default CreateSession
