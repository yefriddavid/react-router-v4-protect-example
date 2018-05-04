//import Request from '../Request'
import * as conf from '../../config'
//import * as apiServices from '../Api'
import * as sessionStorage from '../../SessionStorage'


export const refresh = (req) => {
   return new Promise((resolve, reject) => {
    req.post(
      `/oauth/token`, {
      'grant_type': 'refresh_token',
      'refresh_token': sessionStorage.getRefreshToken(),
      'client_id': conf.API_CLIENT_ID,
      'client_secret': conf.API_CLIENT_SECRET,
      'scope': conf.API_SCOPE
    },
    {
      headers: {
        'Accept': 'application/json'
      }
    }).then(function (res){
        resolve(res)
      }).catch(error => {
          reject(error)
      });
     })
}

export function signin (user, pass, req) {
  return new Promise((resolve, reject) => {
    req.post(`/oauth/token`,
      {
        username: user,
        password: pass,
        grant_type: 'password',
        scope: conf.API_SCOPE,
        client_secret: conf.API_CLIENT_SECRET,
        client_id: conf.API_CLIENT_ID
      }
      ,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    ).then(function (res){
      if(res.status !== 200)
        reject({message: 'User or password incorrect'})

      resolve(res)
    }).catch(function(error){
          reject(error)
    })
  })
}

export function signout (req) {
  return new Promise((resolve, reject) => {

    let currentDate = new Date()
    req.delete('/session/access/' + currentDate.toString() /*, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
        }
      }*/)
      .then(response => {
        resolve(true)
      }).catch(error => {
        resolve(error)
      })
  })
}

export function ping (req) {
  return new Promise((resolve, reject) => {
    return req('/ping', {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(response => {
        return resolve(true)
      }).catch(error => {
          reject(error)
      })
  })
}
export const register = (req, username, password) => {
  return req.post('/register', {username, password})
    .then(() => signin(username, password))
}



