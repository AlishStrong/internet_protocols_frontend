import axios from 'axios'
import { BACKEND_ADDRESS, ELEMENT_ADD_PATH, ELEMENT_REMOVE_PATH } from '../utils/config'
import { ELEMENT_UPDATE } from '../utils/error.constants'

export const removeElement = async (elementId, whiteboardId) => {
  // UC8 and UC10 combined as they are practically the same
  console.log(whiteboardId)
  const payload = { actionId: 8, whiteboardId: 1, elementId: elementId }
  return axios.post(BACKEND_ADDRESS + ELEMENT_REMOVE_PATH, payload).then(response => {
    if (response && response.status === 200) {
      return response.data
    } else {
      const { error } = response.data
      throw new Error(error)
    }
  }).catch(({ message }) => {
    const error = {
      message,
      title: ELEMENT_UPDATE
    }
    return { error }
  })
}

export const editElement = async (elementId, whiteboardId) => {
  // Moving the elements / editing sticky note text / adding/removing comments to images
  console.log(elementId + whiteboardId)
}

export const addElement = async (elementId, pos, text, editState, whiteboardId) => {
  // UC6 AND UC9
  const payload = { actionId: 6, whiteboardId: whiteboardId, elementId: elementId , pos: pos, text: text, editState: editState }
  //console.log(payload)
  return axios.post(BACKEND_ADDRESS + ELEMENT_ADD_PATH, payload).then(response => {
    if (response && response.status === 200) {
      return response.data
    } else {
      const { error } = response.data
      throw new Error(error)
    }
  }).catch(({ message }) => {
    const error = {
      message,
      title: ELEMENT_UPDATE
    }
    return { error }
  })
}


