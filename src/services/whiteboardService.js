import axios from 'axios'
import { SESSION_API } from '../utils/config'
import { WHITEBOARD_CREATION } from '../utils/error.constants'

const createWhiteboard = async (whiteboardInfo, creatorName) => {
  return axios.post(SESSION_API, {
    whiteboard: {
      name: whiteboardInfo.name ?? 'New whiteboard session',
      password: whiteboardInfo.password
    },
    creator: creatorName ?? 'Session Host'
  }).then(response => {
    if (response && response.status === '200') {
      const { whiteboardId } = response.data
      return { whiteboardId }
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
