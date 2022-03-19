/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notify } from '../reducers/notificationReducer'
import { closeWhiteboardDispatcher } from '../reducers/whiteboardReducer'
import whiteboardService from '../services/whiteboardService'

const CloseWhiteboardButton = ({ whiteboardId, token }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const closeWhiteboard = async () => {
    const { message, error } = await whiteboardService.closeWhiteboard(whiteboardId, token)
    if (error) {
      dispatch(notify('danger', error.message, error.title))
    }
    if (message) {
      dispatch(notify('warning', 'You will soon be redirected to the main page', message))
      setTimeout(() => {
        dispatch(closeWhiteboardDispatcher())
        navigate('/')
      }, 4900)
    }
  }

  return (
    <Button onClick={closeWhiteboard}>Close whiteboard</Button>
  )
}

export default CloseWhiteboardButton
