/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CloseWhiteboardButton from '../components/CloseWhiteboardButton'
import InviteToWhiteboardButton from '../components/InviteToWhiteboardButton'
import RequestsToJoin from '../components/RequestsToJoin'
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

  const { user, whiteboard } = useSelector(
    state => ({ user: state.user, whiteboard: state.whiteboard }),
    stateEquality)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(async () => {
    if (!user) {
      dispatch(notify('danger', UNAUTHORIZED_BODY, WHITEBOARD_ACCESS))
      navigate('/')
    } else {
      if (!whiteboard) {
        getWhiteboard()
      }
    }
  })

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
    const ws = new WebSocket('ws://localhost:3001/ws')
    ws.onopen = () => {
      const connectionMessage = {
        token: user.token,
        status: user.status,
        userId: user.userId,
        whiteboardId: id,
        messageType: 'connection'
      }
      console.log('Frontend client makes a WebSocket connection', connectionMessage)
      ws.send(JSON.stringify(connectionMessage))
    }

    ws.onmessage = (event) => {
      console.log('Frontend received a message', event.data)
      const { userId: wsmUserId, status: wsmStatus, whiteboardId: wsmWhiteboardId, messageType: wsmMessageType } = JSON.parse(event.data)
      console.log('msg', { userId: wsmUserId, status: wsmStatus, whiteboardId: wsmWhiteboardId, messageType: wsmMessageType })
      if (wsmMessageType === 'joining') {
        if (wsmStatus === 'pending' && wsmWhiteboardId === id) {
          console.log(`User ${wsmUserId} is asking to join `)
          if (joinRequests.find(uid => uid === wsmUserId)) {
            setJoinRequests(joinRequests)
          } else {
            setJoinRequests(joinRequests.concat(wsmUserId))
          }
        }
        if ((wsmStatus === 'declined' || wsmStatus === 'approved') && wsmWhiteboardId === id) {
          // setJoinRequests(joinRequests.filter(uid => uid !== wsmUserId))
          console.log('The request needs to be removed!')
          console.log('joinRequests beforeFilter', joinRequests)
          console.log('joinRequests afterFilter', joinRequests.filter(uid => uid !== wsmUserId))
          setJoinRequests(joinRequests.filter(uid => uid !== wsmUserId))
        }
      }

      if (wsmMessageType === 'connection' && wsmStatus === 'closed' && wsmWhiteboardId === id) {
        console.log('The session has been terminated!')
        dispatch(notify('warning', 'You will soon be redirected to the main page', 'The whiteboard session has been terminated'))
        setTimeout(() => {
          dispatch(closeWhiteboardDispatcher())
          navigate('/')
        }, 4900)
      }
    }

    if (user.status === 'host') {
      return (
        <>
          <Container>
          Welcome to the whiteboard {id}
            <br />
            <CloseWhiteboardButton whiteboardId={id} token={user.token} />
            <InviteToWhiteboardButton whiteboard={whiteboard} password={whiteboard.password} />
            <RequestsToJoin requesters={joinRequests} whiteboardId={id} token={user.token} />
          </Container>
        </>
      )
    } else {
      return (
        <>
          <Container>
          Welcome to the whiteboard {id}
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
  // import React, { useRef } from 'react'
  // import { Container } from 'react-bootstrap'
  // import { useParams } from 'react-router-dom'
  // import Canvas from '../components/Canvas'
  // import SaveWhiteboard from '../components/SaveWhiteboard'

// const WhiteboardPage = () => {
//   const whiteboardId = useParams().whiteboardId
//   const rootRef = useRef(null)
//   return (
//     <>
//       <SaveWhiteboard rootNode={rootRef.current}>
//       </SaveWhiteboard>
//       <Container style={{ backgroundColor: 'white' }} ref={rootRef}>
//         Welcome to the whiteboard {whiteboardId}
//         <Canvas>
//         </Canvas>
//       </Container>
//     </>
//   )
}

export default WhiteboardPage
