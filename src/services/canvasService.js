import axios from 'axios'
import { BACKEND_ADDRESS, DRAW_API } from '../utils/config'
import { CANVAS_UPDATE } from '../utils/error.constants'

const updateCanvas = async (strokes, whiteboardId) => {
  const payload = { actionId: 13, whiteboardId: whiteboardId, strokes: strokes }
  console.log('Canvas service, updateCanvas, payload', payload)
  return axios.post(BACKEND_ADDRESS + DRAW_API, payload).then(response => {
    if (response && response.status === 200) {
      return response.data
    } else {
      const { error } = response.data
      throw new Error(error)
    }
  }).catch(({ message }) => {
    const error = {
      message,
      title: CANVAS_UPDATE
    }
    return { error }
  })
}

const getCanvasFromBE = async (whiteboardId, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token },
  }

  return axios.get(`${BACKEND_ADDRESS + DRAW_API}/${whiteboardId}`, config)
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
        title: 'Canvas data'
      }
      return { error }
    })
}

export default {
  updateCanvas,
  getCanvasFromBE
}
