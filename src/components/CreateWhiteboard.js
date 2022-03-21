import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notify } from '../reducers/notificationReducer'
import { setUserDispatcher } from '../reducers/userReducer'
import whiteboardService from '../services/whiteboardService'
import { WHITEBOARD_CREATION } from '../utils/error.constants'

const CreateWhiteboard = () => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createWhiteboard = async (event) => {
    event.preventDefault()

    const payload = {}
    payload.creator = event.target.creatorName.value ? event.target.creatorName.value : 'Session Host'
    payload.whiteboard = {}
    payload.whiteboard.name = event.target.whiteboardName.value ? event.target.whiteboardName.value : 'New whiteboard session'
    if (event.target.whiteboardPassword.value) {
      payload.whiteboard.password = event.target.whiteboardPassword.value
    }

    event.target.creatorName.value = ''
    event.target.whiteboardName.value = ''
    event.target.whiteboardPassword.value = ''

    const { whiteboardId, error, token, hostId } = await whiteboardService.createWhiteboard(payload)

    handleClose()

    if (whiteboardId && token) {
      dispatch(setUserDispatcher({ token, status: 'host', userId: hostId }))
      dispatch(notify('success', `Your token ${token}`, `Whiteboard ${whiteboardId} was successfully created`))
      navigate('/whiteboard/' + whiteboardId)
    }

    if (error) {
      const { message } = error
      dispatch(notify('danger', message, WHITEBOARD_CREATION))
    }
  }

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <>
      <Button onClick={handleShow}>Create a session</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new whiteboard session</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createWhiteboard}>
          <Modal.Body>

            <Form.Group className="mb-3"  controlId='whiteboardName'>
              <Form.Label>Whiteboard name</Form.Label>
              <Form.Control type='text' placeholder='Optional' />
            </Form.Group>
            <Form.Group className="mb-3"  controlId='whiteboardPassword'>
              <Form.Label>Whiteboard password</Form.Label>
              <Form.Control type='text' placeholder='Optional' />
            </Form.Group>

            <Form.Group className="mb-3"  controlId='creatorName'>
              <Form.Label>Creator name</Form.Label>
              <Form.Control type='text' placeholder='Optional' />
              <Form.Text className="text-muted">
                Your name visible to other participants. Optional.
              </Form.Text>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
            Close
            </Button>
            <Button variant='primary' type='submit'>
            Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default CreateWhiteboard
