import { put, call, take, fork, race, select } from 'redux-saga/effects'
//import * as apiAuth from '../services/providers/Api/auth'
import * as apiServices from '../services/Api'
import * as sessionStorage from '../services/SessionStorage'

import * as authActions from '../actions/auth'
import * as sysActions from '../actions/sys'
import * as selectors from '../reducers/selectors'
import request from '../services/Request'


export function* authFlow() {
  while(true){
    try{
      const { payload } = yield take(`${authActions.login}`)
      yield call(apiServices.signin, payload.user, payload.pass, request)
      //let loginState = yield select(selectors.selectedLogin)
      yield fork(logoutFlow)
      yield fork(watchStartBackgroundApiTask, request)
    } catch (e) {

    }
  }
}

export function* watchStartBackgroundApiTask(req) {
  yield race({
    task: call(apiServices.handler, req),
    cancel: take(`${sysActions.cancelApiTasks}`)
  })
}

export function* logoutFlow(req) {
  while (true) {
    yield take(`${authActions.logout}`)
    yield call(apiServices.signout, req)
    yield put(sysActions.cancelApiTasks())
  }
}


export default function* root() {
  //yield fork(accessFlow)
  yield fork(authFlow)

  const loginState = yield select(selectors.selectedLogin)
  if(sessionStorage.fullLoggedIn()){
    yield fork(watchStartBackgroundApiTask, request)
    yield fork(logoutFlow, request)
  }
}


