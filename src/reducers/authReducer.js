import * as authActions from '../actions/auth'
import { createReducer } from 'redux-act'
import { combineReducers } from 'redux'


const initial = {
  login: {
    payload: [],
    response: null,
    success: false,
    entities: {},
    errors: {}
  },
};


const login = createReducer({
  [authActions.login]: (state, payload) => {
    return { ...state }
  },
  [authActions.request]: (state, payload) => {
    return { ...state, isFetching: true, success: false }
  },
  [authActions.received]: (state, payload) => {
    return { ...state,
      isFetching: false,
      error: {},
      response: payload,
      success: true,
	    payload: payload.data
    }
  },
  [authActions.errorRequest]: (state, payload) => {
    return { ...state,
      isFetching: false,
      payload: initial.login.payload,
      response: payload
    }
  },
}, initial.login)

export default combineReducers(
  {
    login: login
  }
);


