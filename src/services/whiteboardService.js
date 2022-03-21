import axios from 'axios'
import { BACKEND_ADDRESS, WHITEBOARD_API } from '../utils/config'
import { REQUEST_TO_JOIN, WHITEBOARD_ACCESS, WHITEBOARD_CLOSURE, WHITEBOARD_CREATION } from '../utils/error.constants'

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

const isProtected = (whiteboardId) => {
  return axios.get(`${path}/is-protected/${whiteboardId}`)
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
        title: REQUEST_TO_JOIN
      }
      return { error }
    })
}

const reuqestToJoin = async (whiteboardId, requestData) =>  {
  return axios.post(`${path}/request-to-join/${whiteboardId}`, requestData)
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
        title: REQUEST_TO_JOIN
      }
      return { error }
    })
}

export default {
  createWhiteboard,
  getWhiteboard,
  closeWhiteboard,
  isProtected,
  reuqestToJoin
}
