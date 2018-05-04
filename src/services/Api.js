import * as apiAuth from './providers/Api/auth'
import * as sessionStorage from './SessionStorage'
import { fork, take, call, put } from 'redux-saga/effects'
import * as authActions from '../actions/auth'



export function* signin(user, pass, req){
  try{
    yield put(authActions.request())
    const response = yield call(apiAuth.signin, user, pass, req)
    let finishAt = new Date()
    let beginAt = new Date()
    finishAt.setMilliseconds(finishAt.getMilliseconds() + response.data.expires_in)

    response.data.beginAt = beginAt
    response.data.finishAt = finishAt
    yield put(authActions.received(response))
    sessionStorage.setDataStorage(response.data)
    return true
  } catch (e){
    yield put(authActions.errorRequest(e))
    return true
    //reject(false)
  }
}

export function* signout(req){
  try{
    yield call(apiAuth.signout, req)
    yield put(authActions.clear())
  } catch(e){
    yield put(authActions.errorRequest(e))
  }
}


export function* refresh(req) {
    try{
      const response = yield call(apiAuth.refresh, req)
      sessionStorage.setDataStorage(response.data)
      return true
    } catch(e){
      return false
    }
}








export function* handler(req) {
  //yield fork(ping, req)
}



