import { WS_ENDPOINT } from '../config'
import io from 'socket.io-client'
import * as apiServices from './Api'
import { takeEvery, put, call, take, cancel, fork } from 'redux-saga/effects'
import * as webSocketActions from '../../actions/websocket'
import * as loginActions from '../../actions/auth'
import { eventChannel } from 'redux-saga'
//import sip from 'SIPml'
//import sip from '../js/sip.js'
//import sip from 'https://www.doubango.org/sipml5/SIPml-api.js'
//require('https://www.doubango.org/sipml5/SIPml-api.js')


function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(`${webSocketActions.sendMessage}`);
    socket.emit('message', payload);
  }
}
function* login(socket) {
  while (true) {
    const { payload } = yield take(`${webSocketActions.login}`);
    socket.emit('server.login', payload);
    //yield put(webSocketActions.sendDataServer, { actionName: "login", payload })
  }
}
  /*function* logout(socket) {
  while (true) {
    const { payload } = yield take(`${webSocketActions.logout}`);
    socket.emit('server.logout', payload);
  }
}*/
function* joinTo(socket) {
  while (true) {
    const { payload } = yield take(`${webSocketActions.joinTo}`);
    socket.emit('joinTo', { name: payload });
  }
}

  /*export function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(login, socket);
  yield fork(joinTo, socket);
  yield fork(signout, socket);
  //yield fork(sendDataServer, socket);
}*/

function* flow() {
  while (true) {
    let { payload } = yield take(`${loginActions.login}`)
    alert("dataaaa")
    //const socket = yield call(connect);
    //socket.emit('server.login', { username: payload.username, access_token: payload.access_token });
    //socket.emit('server.login', payload) //enviamos el token al websocket

    alert("data")
    //const task = yield fork(handleIO, socket)
    let action = yield take(`${webSocketActions.logout}`)
    //yield cancel(task);
    //socket.emit('logout');
  }
}

  /*export function* signout(){
    try{
      //yield put(socketActions.request())
      yield put(socketActions.logout())
      yield put(socketActions.clear())
    } catch(e){
      //yield put(socketActions.errorRequest(e))
    }
}*/
function subscribe(socket) {
  return eventChannel(emit => {
    //alert("socket on")
    socket.on('settings.ping', ({ message }) => {
      emit(webSocketActions.pong({ message }))
    });
    socket.on('server.settings.connection.data', (data) => {
      emit(webSocketActions.receiveSettingsConnection(data))
    });
    socket.on('disconnect', e => {
      emit(webSocketActions.disconnection())
    });
    //socket.on('server.confirmreceiveconnection', e => {
    socket.on('connectionOk', e => {
      //alert("del servidor me dijeron que me confirmaron la coneccion")
      emit(webSocketActions.connection())
    });
    /*socket.on('onerror', e => {
      alert("error")
    });*/
    socket.on('exitlogin', e => {
      emit(webSocketActions.takeOut())
      //alert("El servidor te saco")
      //alert("del servidor me dijeron que me confirmaron la coneccion")
      //emit(webSocketActions.connection())
    });
    return () => {};
  });
}

