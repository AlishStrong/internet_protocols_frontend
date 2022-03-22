/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Canvas from '../components/Canvas'
import CloseWhiteboardButton from '../components/CloseWhiteboardButton'
import InviteToWhiteboardButton from '../components/InviteToWhiteboardButton'
import RequestsToJoin from '../components/RequestsToJoin'
import SaveWhiteboard from '../components/SaveWhiteboard'
import { setRedraw, updateStrokes, updateWsUpdate } from '../reducers/canvasReducer'
import { notify } from '../reducers/notificationReducer'
import { closeWhiteboardDispatcher, setWhiteboardDispatcher } from '../reducers/whiteboardReducer'
import whiteboardService from '../services/whiteboardService'
import { UNAUTHORIZED_BODY, WHITEBOARD_ACCESS } from '../utils/error.constants'

const WhiteboardPage = () => {
  const id = useParams().whiteboardId


  /**
   * Custom equality function for proper processing of whiteboard closure
   * Technically, a wrapper around the shallowEqual function of redux.
   * However, it catches when the whiteboard state changes from defined to undefined!
   * When such scenario happens, it means that the host closed the whiteboard session.
   * Therefore, the re-rendering must not happen (true must be returned).
   * In other cases, decision on re-rendering is set to the shallowEqual
  */
  const stateEquality = (leftUserWhiteboard, rightUserWhiteboard) => {
    const result = shallowEqual(leftUserWhiteboard, rightUserWhiteboard)
    if (!result && (!leftUserWhiteboard.whiteboard && rightUserWhiteboard.whiteboard)) {
      return true
    }
    return result
  }

  const [joinRequests, setJoinRequests] = useState([])
  const [ws, setWs] = useState(null)

  const rootRef = useRef(null)

  const { user, whiteboard } = useSelector(
    state => ({ user: state.user, whiteboard: state.whiteboard }),
    stateEquality)

  const strokes = useSelector(state => state.canvas.strokes)
  const wsUpdate = useSelector(state => state.canvas.wsUpdate)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(async () => {
    if (!user) {
      dispatch(notify('danger', UNAUTHORIZED_BODY, WHITEBOARD_ACCESS))
      navigate('/')
    } else {
      if (!whiteboard) {
        getWhiteboard()

      } else {
        if (!ws) {
          setWs(new WebSocket('ws://localhost:3001/ws'))
        } else {
          ws.onopen = () => {
            const connectionMessage = {
              token: user.token,
              status: user.status,
              userId: user.userId,
              whiteboardId: id,
              messageType: 'connection'
            }
            ws.send(JSON.stringify(connectionMessage))
          }

          if (strokes && (ws.readyState === ws.OPEN) && !wsUpdate) {
            const drawingMessage = {
              token: user.token,
              status: user.status,
              userId: user.userId,
              whiteboardId: id,
              messageType: 'drawing',
              strokes
            }
            console.log('Drawing message to send', drawingMessage)
            ws.send(JSON.stringify(drawingMessage))
          }

          ws.onmessage = (event) => {
            const { userId: wsmUserId, status: wsmStatus, whiteboardId: wsmWhiteboardId, messageType: wsmMessageType } = JSON.parse(event.data)
            if (wsmMessageType === 'joining') {
              if (wsmStatus === 'pending' && wsmWhiteboardId === id) {
                if (joinRequests.find(uid => uid === wsmUserId)) {
                  setJoinRequests(joinRequests)
                } else {
                  setJoinRequests(joinRequests.concat(wsmUserId))
                }
              }
              if ((wsmStatus === 'declined' || wsmStatus === 'approved') && wsmWhiteboardId === id) {
                setJoinRequests(joinRequests.filter(uid => uid !== wsmUserId))
              }
            }

            if (wsmMessageType === 'connection' && wsmStatus === 'closed' && wsmWhiteboardId === id) {
              dispatch(notify('warning', 'You will soon be redirected to the main page', 'The whiteboard session has been terminated'))
              setTimeout(() => {
                dispatch(closeWhiteboardDispatcher())
                navigate('/')
              }, 4900)
            }

            if (wsmMessageType === 'drawing' &&
            (wsmStatus === 'host' || wsmStatus === 'user') &&
            wsmWhiteboardId === id &&
            wsmUserId !== user.userId &&
            whiteboard.users.find(uid => uid === wsmUserId)
            ) {
              console.log('Frontend received a drawing message', JSON.parse(event.data))
              const { strokes } = JSON.parse(event.data)
              console.log('Received drawing update')
              dispatch(updateWsUpdate(true))
              dispatch(updateStrokes(strokes))
              dispatch(setRedraw(true))
            }
          }
        }
      }
    }
  })

  // const getCanvas = async () => {
  //   const { strokes: strokesData, error } = await canvasService.getCanvasFromBE(id, user.token)

  //   if (strokesData) {
  //     dispatch(updateStrokes(strokesData))
  //   }
  // }

  const getWhiteboard = async () => {
    const { whiteboard: whiteboardData, error } = await whiteboardService.getWhiteboard(id, user.token)

    if (whiteboardData) {
      dispatch(setWhiteboardDispatcher(whiteboardData))
    }

    if (error) {
      dispatch(notify('danger', error.message, error.title))
      navigate('/')
    }
  }

  if (user && whiteboard) {

    if (user.status === 'host') {
      return (
        <>
          <SaveWhiteboard rootNode={rootRef.current}>
          </SaveWhiteboard>
          <Container style={{ backgroundColor: 'white' }} ref={rootRef}>
          Welcome to the whiteboard {id}
            <br />
            <CloseWhiteboardButton whiteboardId={id} token={user.token} />
            <InviteToWhiteboardButton whiteboard={whiteboard} password={whiteboard.password} />
            <RequestsToJoin requesters={joinRequests} whiteboardId={id} token={user.token} />
            <Canvas>
            </Canvas>
          </Container>
        </>
      )
    } else {
      return (
        <>
          <SaveWhiteboard rootNode={rootRef.current}>
          </SaveWhiteboard>
          <Container style={{ backgroundColor: 'white' }} ref={rootRef}>
          Welcome to the whiteboard {id}
            <Canvas>
            </Canvas>
          </Container>
        </>
      )
    }
  } else {
    return (
      <>
      </>
    )
  }
}

export default WhiteboardPage
