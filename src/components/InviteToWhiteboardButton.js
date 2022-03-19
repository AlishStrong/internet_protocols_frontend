/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap'

const InviteToWhiteboardButton = ({ password }) => {
  const [show, setShow] = useState(false)
  const [buttonText, setButtonText] = useState('Copy')
  const [passwordButtonText, setPasswordButtonText] = useState('Copy')

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const copy = (element) => {
    const input = document.getElementById(element)
    input.select()
    if (element === 'whiteboard-link') {
      navigator.clipboard.writeText(window.location.href+'/join')
      setButtonText('Copied')
      setTimeout(() => setButtonText('Copy'), 4000)
    }

    if (element === 'whiteboard-password') {
      navigator.clipboard.writeText(password)
      setPasswordButtonText('Copied')
      setTimeout(() => setPasswordButtonText('Copy'), 4000)
    }
  }

  return (
    <>
      <Button onClick={handleShow}>Share</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new whiteboard session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              className={buttonText === 'Copied' ? 'border border-primary' : ''}
              readOnly
              id='whiteboard-link'
              value={window.location.href}
              aria-label="Invitation link to the whiteboard"
              aria-describedby="basic-addon2"
            />
            <Button
              className={buttonText === 'Copied' ? 'border border-primary' : ''}
              variant="primary"
              id="button-addon2"
              onClick={() => copy('whiteboard-link')}
            >
              {buttonText}
            </Button>
          </InputGroup>
          { password ?
            <InputGroup className="mb-3">
              <FormControl
                className={passwordButtonText === 'Copied' ? 'border border-primary' : ''}
                readOnly
                id='whiteboard-password'
                value={password}
                aria-label="Password for the whiteboard"
                aria-describedby="basic-addon2"
              />
              <Button
                className={passwordButtonText === 'Copied' ? 'border border-primary' : ''}
                variant="primary"
                id="button-addon2"
                onClick={() => copy('whiteboard-password')}
              >
                {passwordButtonText}
              </Button>
            </InputGroup>
            : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InviteToWhiteboardButton
