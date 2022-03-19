import React, { useEffect, useRef } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCurrent, pushPoint, pushStroke, setDrawing,
  setErase, setRedraw, undoStroke, updateWsUpdate
} from '../reducers/canvasReducer'
import canvasService from '../services/canvasService'

const Canvas = () => {
  const canvasRef = useRef(null)
  const dispatch = useDispatch()
  const isDrawing = useSelector(state => state.canvas.isDrawing)
  const isErasing = useSelector(state => state.canvas.isErasing)
  const strokes = useSelector(state => state.canvas.strokes)
  const currentDrawing = useSelector(state => state.canvas.currentDrawing)
  const whiteboardId = useSelector(state => {
    if (state.whiteboard && state.whiteboard.id) {
      return state.whiteboard.id
    } else {
      return null
    }
  })
  const shouldRedraw = useSelector(state => state.canvas.shouldRedraw)

  const toggleErase = () => {
    dispatch(setErase(!isErasing))
  }

  const draw = (e) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (isDrawing) {
      if (isErasing) {
        context.globalCompositeOperation = 'destination-out'
      } else {
        context.globalCompositeOperation = 'source-over'
      }
      const x = e.pageX - canvas.offsetLeft
      const y = e.pageY - canvas.offsetTop
      context.lineTo(x, y)
      context.stroke()
      dispatch(pushPoint({ x: x, y: y, erasing: isErasing, mode: 'draw' }))
    }
  }

  const startDrawing = (e) => {
    dispatch(setDrawing(true))
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.beginPath()
    const x = e.pageX - canvas.offsetLeft
    const y = e.pageY - canvas.offsetTop
    context.moveTo(x, y)
    dispatch(pushPoint({ x: x, y: y, erasing: isErasing, mode: 'begin' }))
  }

  const stopDrawing = () => {
    console.log('stopDrawing')
    dispatch(updateWsUpdate(false))
    dispatch(pushStroke(currentDrawing))
    dispatch(setDrawing(false))
    dispatch(clearCurrent())
    console.log('Update canvas call after stopDrawing')
    canvasService.updateCanvas(strokes, whiteboardId)
  }

  const redrawAll = () => {
    // console.log('Canvas redrawAll() should be called strokes', strokes)
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (strokes.length > 0) {
      for (let j = 0; j < strokes.length; j++) {
        const stroke = strokes[j]
        for (let i = 0; i < stroke.length; i++) {

          const pt = stroke[i]
          context.globalCompositeOperation = pt.erasing ? 'destination-out' : 'source-over'

          if (pt.mode === 'begin') {
            context.beginPath()
            context.moveTo(pt.x, pt.y)
          } else if (pt.mode === 'draw') {
            context.lineTo(pt.x, pt.y)
            context.stroke()
          }
        }
      }
    }
  }

  const undo = () => {
    dispatch(updateWsUpdate(false))
    dispatch(undoStroke())
    canvasService.updateCanvas(strokes, whiteboardId)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.strokeStyle = '#c90606'
    context.lineWidth = 2
    console.log('Canvas was rerendered shouldRedraw', shouldRedraw)
    if (shouldRedraw) {
      console.log('Canvas was rerendered redrawAll() should be called')
      redrawAll()
      dispatch(setRedraw(false))
    }

    canvas.onmousedown = startDrawing
    canvas.onmousemove = draw
    canvas.onmouseup = stopDrawing
  })

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <Button
            className="mb-2"
            variant={isErasing ? 'warning' : 'outline-warning'}
            onClick={toggleErase}
          >Erase</Button>
        </Col>
        <Col xs={12}>
          <Button
            className="mb-2"
            onClick={undo}
          >Undo</Button>
        </Col>
      </Row>
      <Row className='border border-primary'>
        <canvas ref={canvasRef} width="1296" height="820">
        </canvas>
      </Row>
    </React.Fragment>
  )
}

export default Canvas
