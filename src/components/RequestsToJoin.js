import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import whiteboardService from '../services/whiteboardService'

const RequestCard = ({ userId, whiteboardId, token }) => {
  const dispatch = useDispatch()

  const processRequest = async (decision) => {
    const { message, error } = await whiteboardService.processRequest(whiteboardId, userId, decision, token)
    if (error) {
      dispatch(notify('danger', `An issue rose trying to ${decision ? 'approve' : 'decline'} the request`, 'Join request processing'))
    }

    if (message) {
      dispatch(notify('success', message, 'Join request processing'))
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{userId} asks to join</Card.Title>
        <Button variant='success' onClick={() => processRequest(true)}>Accept</Button>
        <Button variant='danger' onClick={() => processRequest(false)}>Decline</Button>
      </Card.Body>
    </Card>
  )
}

const RequestsToJoin = ({ requesters, whiteboardId, token }) => {

  return (
    <>
      { requesters.map(userId => <RequestCard key={userId} whiteboardId={whiteboardId} token={token} userId={userId} />)}
    </>
  )
}

export default RequestsToJoin
