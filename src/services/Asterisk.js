//import Request from './Request'
//import * as conf from './config'
//import * as asteriskServices from './providers/Asterisk'
import { fork, take, call, put } from 'redux-saga/effects'
//import * as selectors from '../reducers/selectors'
//import * as accessActions from '../actions/access'
import * as asteriskActions from '../actions/asterisk'
import { eventChannel } from 'redux-saga'
import * as sipProvider from './providers/Sip/SipJs'
//import * as sipProvider from './providers/Sip/SipMl'
//import sip from 'SIPml'
//import sip from '../js/sip.js'
//import test from '../js/test'
//import test from '../js/sip.prettier.js'


export function connect () {
  //return sipProvider.connect()
  //console.log(sipProvider)
  return new Promise((resolve, reject) => {
    //const ua = new SIP.UA(config);
    //resolve(ua)

      resolve(sipProvider.connect())
  })

    /*        var config = {
              uri: '1060@10.10.0.60',

              // Replace this IP address with your Asterisk IP address,
              // and replace the port with your Asterisk port from the http.conf file
              ws_servers: 'ws://10.10.0.60:8087/ws',

              // Replace this with the username from your sip.conf file
              authorizationUser: '1060',

              // Replace this with the password from your sip.conf file
              password: 'microvoz123',

              // HackIpInContact for Asterisk
              hackIpInContact: true,

              // rtcpMuxPolicy for Asterisk
              rtcpMuxPolicy: 'negotiate',
            };

  return new Promise((resolve, reject) => {
      const ua = new SIP.UA(config);
      resolve(ua)
  });*/

}


export function connecta () {

      var params = {
            realm: "10.10.0.60",
            impi: "1059a",
            impu: "sip:1059@10.10.0.60",
            password: "microvoz123a",
            display_name: "1059",
            websocket_proxy_url: "ws://10.10.0.60:8088/ws",
            outbound_proxy_url: "",
            ice_servers: "",
            enable_rtcweb_breaker: "",
            //events_listener: ,
            enable_early_ims: true,
            enable_media_stream_cache: true,
            bandwidth: undefined,
            video_size: undefined,
            sip_headers: [
                    { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2016.03.04' },
                    { name: 'Organization', value: 'Doubango Telecom' }
            ]
        };
  return new Promise((resolve, reject) => {
    let oSipStack = new window.SIPml.Stack(params);
    if (oSipStack.start() !== 0) {
      reject(false)
    }else{
      //console.log(oSipStack)
      resolve(oSipStack)
    }
  });

}

export function* initCall(sip) {
  while (true) {
    yield take(`${asteriskActions.initCall}`)
    //console.log(socket)
    //console.log(oConfigCall)


    yield call(sipProvider.initCall, sip)

      /*var oSipSessionCall = socket.newSession("call-audio", oConfigCall)
    if (oSipSessionCall.call("1061") != 0) {
      alert("error")
        oSipSessionCall = null;
        return;
    }*/

  }
}
export function* signout(socket) {
  while (true) {
    const { payload } = yield take(`${asteriskActions.logout}`);
    socket.emit('server.logout', payload);
  }
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
function subscribe(socket) {
  return eventChannel(emit => {
    console.log(socket)
    /*socket.on('i_ao_request', ({ message }) => {
      alert("request")
      //emit(socketActions.pong({ message }))
    });
    socket.on('terminated', (data) => {
      alert("terminated")
      //emit(socketActions.receiveSettingsConnection(data))
    });
    socket.on('disconnect', e => {
      //emit(socketActions.disconnection())
    });
    socket.on('connectionOk', e => {
      //emit(socketActions.connection())
    });
    socket.on('exitlogin', e => {
      //emit(authActions.logout())
    });*/
    return () => {};
  });
}
export function* handler(socket) {
  yield fork(read, socket)
  yield fork(initCall, socket)
  //yield fork(ping, req)
  //yield fork(refresh, req)
  //yield fork(signout, request)
}
