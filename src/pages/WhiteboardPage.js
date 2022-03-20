/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CloseWhiteboardButton from '../components/CloseWhiteboardButton'
import InviteToWhiteboardButton from '../components/InviteToWhiteboardButton'
import { notify } from '../reducers/notificationReducer'
import { setWhiteboardDispatcher } from '../reducers/whiteboardReducer'
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
    if (user.status === 'host') {
      return (
        <>
          <Container>
          Welcome to the whiteboard {id}
            <br />
            <CloseWhiteboardButton whiteboardId={id} token={user.token} />
            <InviteToWhiteboardButton whiteboard={whiteboard} password={whiteboard.password} />
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
}

export default WhiteboardPage
