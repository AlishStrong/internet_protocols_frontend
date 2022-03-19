import axios from 'axios'
import { BACKEND_ADDRESS, WHITEBOARD_API } from '../utils/config'
import { WHITEBOARD_ACCESS, WHITEBOARD_CREATION } from '../utils/error.constants'

const path = BACKEND_ADDRESS + WHITEBOARD_API

const createWhiteboard = async (whiteboardInfo, creatorName) => {
  const payload = {}
  payload.creator = creatorName ? creatorName : 'Session Host'
  payload.whiteboard = {}
  payload.whiteboard.name = whiteboardInfo.name ? whiteboardInfo.name : 'New whiteboard session'
  if (whiteboardInfo.password) {
    payload.whiteboard.password = whiteboardInfo.password
  }

  return axios.post(path, payload)
    .then(response => {
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

const getWhiteboard = async (whiteboardId, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token },
  }

  return axios.get(`${path}/${whiteboardId}`, config)
    .then(response => {
      if (response && response.status === 200) {
        return response.data
      } else {
        const { error } = response.data
        throw new Error(error)
      }
    }).catch(({ message }) => {
      const error = {
        message,
        title: WHITEBOARD_ACCESS
      }
      return { error }
    })
}

export default {
  createWhiteboard,
  getWhiteboard
}
