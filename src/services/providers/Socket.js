import { WS_ENDPOINT } from '../config'
import io from 'socket.io-client'
import * as apiServices from './Api'
import { put, call, take, fork } from 'redux-saga/effects'
import * as socketActions from '../../actions/websocket'
import * as authActions from '../../actions/auth'
//import * as loginActions from '../actions/login'
import { eventChannel } from 'redux-saga'

  /*export function connect () {
  //alert("fock")
  let options = {
                  extraHeaders: {
                    Authorization: 'Bearer ' + apiServices.getAccessToken() //sessionStorage.getItem("access_token") //new Buffer('user:pass').toString('base64')
                  }
                }
  //console.log("data")
  //alert(options.extraHeaders.Authorization)
  const socket = io(WS_ENDPOINT, options)
  //const socket = io('http://localhost:81', options)
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}*/


