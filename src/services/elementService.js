import axios from 'axios'
import { BACKEND_ADDRESS, ELEMENT_ADD_PATH, ELEMENT_REMOVE_PATH, ELEMENT_EDIT_PATH } from '../utils/config'
import { ELEMENT_UPDATE } from '../utils/error.constants'

export const removeElement = async (elementId, whiteboardId) => {
  // UC8 and UC10 combined as they are practically the same
  console.log(whiteboardId)
  const payload = { actionId: 8, whiteboardId: whiteboardId, elementId: elementId }
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

export const updateElementEditor = async (elementId, whiteboardId, userID, editState) => {
  // Update the editState and currentEditor
  const payload = { actionId: 20, whiteboardId: whiteboardId, elementId: elementId , editState: editState, currentUser: userID }
  console.log(payload)
  return axios.post(BACKEND_ADDRESS + ELEMENT_EDIT_PATH, payload).then(response => {
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

export const editSticky = async (elementId, whiteboardId, pos, text) => {
  // Update pos and/or text
  const payload = { actionId: 7, whiteboardId: whiteboardId, elementId: elementId , pos: pos, text: text }
  console.log(payload)
  return axios.post(BACKEND_ADDRESS + ELEMENT_EDIT_PATH, payload).then(response => {
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

export const editImage = async (elementId, whiteboardId, pos, comments) => {
  // UC11&12
  const payload = { actionId: 11, whiteboardId: whiteboardId, elementId: elementId , pos: pos, comments: comments }
  console.log(payload)
  return axios.post(BACKEND_ADDRESS + ELEMENT_EDIT_PATH, payload).then(response => {
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

export const addElement = async (elementId, pos, text, editState, whiteboardId) => {
  // UC6
  const payload = { actionId: 6, whiteboardId: whiteboardId, elementId: elementId , pos: pos, text: text, editState: editState, currentUser: 'noUser' }
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

export const addImageElement = async (elementId, pos, comments,src, editState, whiteboardId) => {
  // UC9
  const payload = { actionId: 9, whiteboardId: whiteboardId, elementId: elementId , pos: pos,src: src, comments: comments, editState: editState, currentUser: 'noUser' }
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



