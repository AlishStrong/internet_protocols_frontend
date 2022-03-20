import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CloseWhiteboardButton from '../components/CloseWhiteboardButton'
import InviteToWhiteboardButton from '../components/InviteToWhiteboardButton'
import { notify } from '../reducers/notificationReducer'
import whiteboardService from '../services/whiteboardService'
import { UNAUTHORIZED_BODY, WHITEBOARD_ACCESS } from '../utils/error.constants'

const WhiteboardPage = () => {
  const id = useParams().whiteboardId

  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(async () => {
    if (!user) {
      dispatch(notify('danger', UNAUTHORIZED_BODY, WHITEBOARD_ACCESS))
      navigate('/')
    } else {
      const { whiteboardId, userId, error } = await whiteboardService.getWhiteboard(id, user.token)

      if (error) {
        dispatch(notify('danger', error.message, error.title))
        navigate('/')
      } else {
        console.log(`WhiteboardPage all is good: whiteboardId ${whiteboardId}, userId ${userId}`)
      }
    }
  })

  if (user) {
    return (
      <>
        <Container>
        Welcome to the whiteboard {id}
          <br />
          <CloseWhiteboardButton  whiteboardId={id} token={user.token} />
          <InviteToWhiteboardButton />
        </Container>
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

export default WhiteboardPage
