//import Request from './Request'
import { WS_ENDPOINT } from './config'
//import * as conf from './config'
import * as sessionStorage from './SessionStorage'
import { fork, take, call, put } from 'redux-saga/effects'
//import * as selectors from '../reducers/selectors'
//import * as accessActions from '../actions/access'
import * as socketActions from '../actions/websocket'
import * as authActions from '../actions/auth'
import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'



export function connect () {
  let options = {
                  extraHeaders: {
                    Authorization: 'Bearer ' + sessionStorage.getAccessToken()
                  }
                }
  const socket = io(WS_ENDPOINT, options)
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

//asi se envian mensajes al socket
  /*function* sendDataServer(socket) {
  while (true) {
    const { payload } = yield take(`${socketActions.sendDataServer}`)
    socket.emit('server.' + payload.actionName, payload.data)
  }
}*/
function* write(socket) {
  while (true) {
    const { payload } = yield take(`${socketActions.sendMessage}`);
    socket.emit('message', payload);
  }
}
function* login(socket) {
  while (true) {
    const { payload } = yield take(`${socketActions.login}`);
    socket.emit('server.login', payload);
    //yield put(socketActions.sendDataServer, { actionName: "login", payload })
  }
}
export function* logout(socket) {
  //alert("Voy a desloguearme")
  while (true) {
    yield take(`${socketActions.logout}`);
    socket.emit('server.logout')
    socket.disconnect()
    //alert("Camila")
  }
}
function* joinTo(socket) {
  while (true) {
    const { payload } = yield take(`${socketActions.joinTo}`);
    socket.emit('joinTo', { name: payload });
  }
}

export function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(login, socket);
  yield fork(joinTo, socket);
  yield fork(logout, socket);
  //yield fork(sendDataServer, socket);
}

/*function* flow() {
  while (true) {
    let { payload } = yield take(`${loginActions.login}`)
    alert("dataaaa")
    const socket = yield call(connect);
    //socket.emit('server.login', { username: payload.username, access_token: payload.access_token });
    socket.emit('server.login', payload) //enviamos el token al websocket

    alert("data")
    const task = yield fork(handleIO, socket)
    let action = yield take(`${socketActions.logout}`)
    alert("mundo")
    yield cancel(task);
    socket.emit('logout');
  }
}*/

function subscribe(socket) {
  return eventChannel(emit => {
    //alert("socket on")
    socket.on('settings.ping', ({ message }) => {
      emit(socketActions.pong({ message }))
    });
    socket.on('server.settings.connection.data', (data) => {
      emit(socketActions.receiveSettingsConnection(data))
    });
    socket.on('disconnect', e => {
      emit(socketActions.disconnection())
    });
    //socket.on('server.confirmreceiveconnection', e => {
    socket.on('connectionOk', e => {
      //alert("del servidor me dijeron que me confirmaron la coneccion")
      emit(socketActions.connection())
    });
    /*socket.on('onerror', e => {
      alert("error")
    });*/
    socket.on('exitlogin', e => {
      //emit(authActions.logout())
    });
    return () => {};
  });
}

export function* signout(){
    try{
      //yield put(socketActions.request())
      yield put(socketActions.logout())
      yield put(socketActions.clear())
    } catch(e){
      //yield put(socketActions.errorRequest(e))
    }
}
