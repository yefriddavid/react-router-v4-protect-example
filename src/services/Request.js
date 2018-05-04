import axios from 'axios'
import * as conf from './config'
import * as apiProvider from './providers/Api/auth'
import * as sessionStorage from './SessionStorage'

const Request = axios.create({
  baseURL: conf.API_ENDPOINT,
})

let isRefreshing = false
let isOlder = false
let refreshSubscribers = []


//Request.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getAccessToken
Request.interceptors.request.use(async (config) => {
    if(sessionStorage.loggedIn()){
      if(!sessionStorage.fullLoggedIn() && !isOlder){
        isOlder = true
        //alert("validare el token")
          /*new Promise((resolve, reject) => {
          refresh().then( function(newToken) {
            setSignData(newToken.data)
            alert("Resolvimos")
              isOlder = false
            resolve(config)
          }).catch( function(e) {

          })
        })*/

        //const response = await
        try{
          await
            //apiServices.refresh(Request)
             apiProvider.refresh(Request)
          alert("allright")
        }catch(ex){
          alert("all bad")

        }
      }
    }
  //config.headers = [...config.headers, sessionStorage.getHeaders() ]
  const headers = sessionStorage.getHeaders()
  //console.log("-----------------", headers)
  config.headers["Authorization"] = headers["Authorization"]
  //config.headers.push(...headers)
    /*headers.forEach(function(element) {
  console.log("---------------------------->", element)
  config.headers[]

});*/

  //alert("444")
  //console.log("===================", config)
    return config
  //}else
  //return config;


  //config.headers.common['apiServices.rization'] = 'Bearer xxx'
});

Request.interceptors.response.use(response => {

  return response;
}, error => {
  //alert("xxxx")
  const { config } = error
  //console.log(error)
  //const { response: { status } } = error || { response: { status: false } }
  const response = error || { response: { status: false } }
  let { status } =response

  const originalRequest = config;

  //console.log("Si el api retorna un 498 refrescamos el token")

  if (status === 498) {
    if (!isRefreshing) {
      isRefreshing = true;
      Request.post("oapiServices.token",
        {
        'grant_type': 'refresh_token',
          'refresh_token': sessionStorage.getRefreshToken(), //sessionStorage.getItem('refresh_token'),
        'client_id': conf.API_CLIENT_ID,
        'client_secret': conf.API_CLIENT_SECRET,
        'scope': conf.API_SCOPE
        }
        ).then(newToken => {
          //apiServices.setSignData(newToken.data)
          isRefreshing = false
          onRrefreshed(newToken.data.access_token)
          return newToken
        }).error( e => {
          console.log("Aca se redirecciona al home de la pagina web")
        } );
    }

    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + sessionStorage.getAccessToken()
        resolve(Request(originalRequest));
      });
    });
    return retryOrigReq
  } else {
        const rs = Object.assign({}, error)
        if(typeof rs.response === 'undefined'){
          return Promise.reject({status: false, message: 'Not internet connection...'})
        }else{
          //reject(rs)
          return Promise.reject(error);
        }
  }
  //return Promise.reject(error);
});


function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}


export default Request

