
export function connect () {

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
    if (oSipStack.start() != 0) {
      reject(false)
    }else{
      //console.log(oSipStack)
      resolve(oSipStack)
    }
  });

}


export function onSipEventSession(e /* SIPml.Session.Event */) {

            switch (e.type) {
                case 'started':
                    {

                        break;
                    }
                case 'stopping': case 'stopped': case 'failed_to_start': case 'failed_to_stop':
                    {
                        break;
                    }
                case 'i_new_call':
                    {
                        break;
                    }
                case 'm_permission_requested':
                    {
                        break;
                    }
                case 'm_permission_accepted':
                case 'm_permission_refused':
                    {
                        break;
                    }
                case 'starting': default: break;
            }

}
            var videoLocal = document.getElementById("video_local");
            var videoRemote = document.getElementById("video_remote");
            var audioRemote = document.getElementById("audio_remote");


var oConfigCall = {
                audio_remote: audioRemote,
  //video_local: viewVideoLocal,
  //video_remote: viewVideoRemote,
                screencast_window_id: 0x00000000, // entire desktop
                bandwidth: { audio: undefined, video: undefined },
                video_size: { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined },
                events_listener: { events: '*',
                                    listener: onSipEventSession
                                  },
                sip_caps: [
                                { name: '+g.oma.sip-im' },
                                { name: 'language', value: '\"en,fr\"' }
                ]
            };

export function initCall(socket){

  var oSipSessionCall = socket.newSession("call-audio", oConfigCall)
  if (oSipSessionCall.call("1061") != 0) {
    alert("error")
      oSipSessionCall = null;
      return;
  }
}



