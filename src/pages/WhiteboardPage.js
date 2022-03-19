import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const WhiteboardPage = () => {
  const whiteboardId = useParams().whiteboardId
  return (
    <>
      <Container>
      Welcome to the whiteboard {whiteboardId}
      </Container>
    </>
  )
}

export default WhiteboardPage
