import axios from 'axios'
import { BACKEND_ADDRESS, WHITEBOARD_API } from '../utils/config'
import { WHITEBOARD_ACCESS, WHITEBOARD_CLOSURE, WHITEBOARD_CREATION } from '../utils/error.constants'

const path = BACKEND_ADDRESS + WHITEBOARD_API

const createWhiteboard = async (payload) => {
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

const closeWhiteboard = (whiteboardId, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token },
  }

  return axios.delete(`${path}/${whiteboardId}`, config)
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
        title: WHITEBOARD_CLOSURE
      }
      return { error }
    })
}

export default {
  createWhiteboard,
  getWhiteboard,
  closeWhiteboard
}
