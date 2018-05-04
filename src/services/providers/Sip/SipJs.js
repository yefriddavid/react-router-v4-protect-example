//import sip from 'SIPml'
import SIP from 'sip.js'

export function connect () {
          var config = {
              uri: '1060@10.10.0.60',

              // Replace this IP address with your Asterisk IP address,
              // and replace the port with your Asterisk port from the http.conf file
              ws_servers: 'ws://10.10.0.60:8088/ws',

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

    console.log("--------------esto mande----------------")
    console.log(ua)
      resolve(ua)
  });

}


export function initCall(ua){

  ua.invite('1061',{
    media: {
      constraints: {
        audio: true,
        video: false
      }
    }
  })

}



//export default sip



