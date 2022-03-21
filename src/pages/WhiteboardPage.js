import React, { useRef } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Canvas from '../components/Canvas'
import SaveWhiteboard from '../components/SaveWhiteboard'

const WhiteboardPage = () => {
  const whiteboardId = useParams().whiteboardId
  const rootRef = useRef(null)
  return (
    <>
      <SaveWhiteboard rootNode={rootRef.current}>
      </SaveWhiteboard>
      <Container style={{ backgroundColor: 'white' }} ref={rootRef}>
        Welcome to the whiteboard {whiteboardId}
        <Canvas>
        </Canvas>
      </Container>
    </>
  )
}

export default WhiteboardPage
