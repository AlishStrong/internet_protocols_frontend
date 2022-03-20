import axios from 'axios'
import { BACKEND_ADDRESS, DRAW_API } from '../utils/config'
import { CANVAS_UPDATE } from '../utils/error.constants'

const updateCanvasReq = async (strokes, whiteboardId) => {
  const payload = { actionId: 13, whiteboardId: whiteboardId, strokes: strokes }
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

export default updateCanvasReq

