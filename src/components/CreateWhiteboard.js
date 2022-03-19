import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { initializeWhiteboard } from '../reducers/whiteboardReducer'

const CreateWhiteboard = () => {
  const [show, setShow] = useState(false)

  const whiteboardId = useSelector(state => state.whiteboard)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (whiteboardId) {
      navigate('/whiteboard/' + whiteboardId)
    }
  })

  const createWhiteboard = async (event) => {
    event.preventDefault()

    const whiteboardInfo = {
      name: event.target.whiteboardName.value,
      password: event.target.whiteboardPassword.value
    }
    const creatorName = event.target.creatorName.value

    event.target.creatorName.value = ''
    event.target.whiteboardName.value = ''
    event.target.whiteboardPassword.value = ''

    dispatch(initializeWhiteboard(whiteboardInfo, creatorName))
    handleClose()
  }

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <>
      <p>{whiteboardId}</p>
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
