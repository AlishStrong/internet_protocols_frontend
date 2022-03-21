/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { notify } from '../reducers/notificationReducer'
import { setUserDispatcher } from '../reducers/userReducer'
import whiteboardService from '../services/whiteboardService'
import { REQUEST_TO_JOIN } from '../utils/error.constants'

const ReuqestToJoin = () => {
  const whiteboardId = useParams().whiteboardId

  const [passwordRequired, setPasswordRequired] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(async () => {
    const { protected: isProtected, error } = await whiteboardService.isProtected(whiteboardId)

    if (error) {
      dispatch(notify('danger', error.message, error.title))
      navigate('/')
    } else {
      setPasswordRequired(isProtected)
    }
  })

  const requestToJoin = async (event) => {
    event.preventDefault()

    let name, password

    name = event.target.userName.value

    if (passwordRequired) {
      password = event.target.whiteboardPassword.value
    }

    const { userToken, userId, message, error } = await whiteboardService.reuqestToJoin(whiteboardId, { name, password })

    if (userToken && message) {
      dispatch(setUserDispatcher({ token: userToken, status: 'pending', userId }))
      dispatch(notify('info', message, 'Your request to join is sent to host for processing'))
    }

    if (error) {
      dispatch(notify('danger', error.message, REQUEST_TO_JOIN))
    }

    navigate('/', { state: { whiteboardId } })
  }

  if (passwordRequired === null) {
    return (
      <Container>
        {whiteboardId}. Password is null
      </Container>
    )
  }

  return (
    <Container>
      <Form onSubmit={requestToJoin}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Your name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        {passwordRequired ?
          <Form.Group className="mb-3" controlId="whiteboardPassword">
            <Form.Label>Whiteboard password</Form.Label>
            <Form.Control type="password" placeholder="Enter whiteboard password" />
          </Form.Group> :
          <></>}
        <Button variant="primary" type="submit">Request to join</Button>
      </Form>
    </Container>
  )
}

export default ReuqestToJoin
