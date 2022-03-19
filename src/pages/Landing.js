/* eslint-disable no-unused-vars */
import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateWhiteboard from '../components/CreateWhiteboard'
import { notify } from '../reducers/notificationReducer'
import { setUserDispatcher } from '../reducers/userReducer'

const Landing = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (location.state && location.state.whiteboardId && user) {
    const whiteboardId = location.state.whiteboardId
    const { token, status, userId, name } = user
    console.log('This was after request to join', { whiteboardId, token, status, userId })

    const ws = new WebSocket('ws://localhost:3001/ws')
    ws.onopen = () => {
      const connectionMessage = {
        token,
        status,
        userId,
        whiteboardId,
        messageType: 'connection'
      }
      console.log('Frontend client makes a WebSocket connection', connectionMessage)
      ws.send(JSON.stringify(connectionMessage))
    }

    ws.onclose = (event) => {
      console.log('WebSocket faced a CLOSE', event)
      // event.code, event.reason
      // dispatch(notify('danger', event.reason, event.code))
      // navigate('/')
    }

    ws.onmessage = (event) => {
      console.log('Frontend received a message', event.data)
      const { messageType, status: decision, userId: msgUserId, whiteboardId: msgWhiteboardId } = JSON.parse(event.data)
      if (messageType === 'joining' && msgUserId === userId && msgWhiteboardId === whiteboardId) {
        if (decision === 'approved') {
          dispatch(setUserDispatcher({ token, status: 'user', userId, name }))
          dispatch(notify('success', 'Host approved your request', 'Request to join'))
          navigate('/whiteboard/' + whiteboardId)
        }
        if (decision === 'declined') {
          dispatch(setUserDispatcher(null))
          dispatch(notify('warning', 'Host declined your request', 'Request to join'))
          navigate('/')
        }
      }
    }
  }

  return (
    <Container>
      <CreateWhiteboard />
    </Container>
  )
}
export default Landing
