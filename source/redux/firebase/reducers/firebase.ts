import { SET_USER } from "../actions/firebase";

const initialState = {
  user: {}
}

export const firebase = (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_USER:
    return {
      user: payload
    }
      
  default:
    return state
  }
}