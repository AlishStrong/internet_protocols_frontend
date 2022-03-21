/* eslint-disable no-unused-vars */
import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateWhiteboard from '../components/CreateWhiteboard'

const Landing = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (location.state && location.state.whiteboardId && user) {
    const whiteboardId = location.state.whiteboardId
    const { token, status, userId } = user
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
    }
  }

  return (
    <Container>
      <CreateWhiteboard />
    </Container>
  )
}
export default Landing
