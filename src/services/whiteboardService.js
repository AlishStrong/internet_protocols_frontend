import axios from 'axios'
import { BACKEND_ADDRESS, WHITEBOARD_API } from '../utils/config'
import { WHITEBOARD_CREATION } from '../utils/error.constants'

const createWhiteboard = async (whiteboardInfo, creatorName) => {
  const payload = {}
  payload.creator = creatorName ? creatorName : 'Session Host'
  payload.whiteboard = {}
  payload.whiteboard.name = whiteboardInfo.name ? whiteboardInfo.name : 'New whiteboard session'
  if (whiteboardInfo.password) {
    payload.whiteboard.password = whiteboardInfo.password
  }

  return axios.post(BACKEND_ADDRESS + WHITEBOARD_API, payload).then(response => {
    if (response && response.status === 200) {
      return response.data
    } else {
      const { error } = response.data
      throw new Error(error)
    }
  }).catch(({ message }) => {
    const error = {
      message,
      title: WHITEBOARD_CREATION
    }
    return { error }
  })
}

export default {
  createWhiteboard
}
