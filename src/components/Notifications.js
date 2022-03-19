import React, { useEffect } from 'react'
import { Alert, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { completeNotification } from '../reducers/notificationReducer'

const Notification = ({ message, title, index }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => dispatch(completeNotification(index)), 5000)
  })

  return (
    <Alert variant="danger" onClose={() => dispatch(completeNotification(index))} dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

const Notifications = () => {
  const notifications = useSelector(state => state.notifications)

  return (
    <Container className="mt-3">
      {notifications.map((n, index) => <Notification key={index} message={n.message} title={n.title} index={index} />)}
    </Container>
  )
}

export default Notifications
