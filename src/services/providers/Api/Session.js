import * as conf from '../../config'
//import * as sessionStorage from '../SessionStorage'

let uri = "/session"


export const loginCampaign = (req, data) => {
   return new Promise((resolve, reject) => {
     req.put(`${uri}/campaign/login`, data,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      ).then(function (res){
        //if(res.status === 402)
        //  reject('Licencia vencida')

        //res.data.success = true
        resolve(res)
      }).catch(error => {
          reject(error)
      })
     })
}

export const logoutCampaign = (req, data) => {
   return new Promise((resolve, reject) => {
     req.put(`${uri}/campaign/logout`, data,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      ).then(function (res){
        resolve(res)
      }).catch(error => {
          reject(error)
      })
     })
}
export const startPauseCampaign = (req, data) => {
   return new Promise((resolve, reject) => {
     //start-end
     req.put(`${uri}/status/pause/start`, data,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      ).then(function (res){
        resolve(res)
      }).catch(error => {
          reject(error)
      })
     })
}
export const pauseCampaign = (req, data) => {
   return new Promise((resolve, reject) => {
     req.put(`${uri}/status/pause/` + data.action, data,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      ).then(function (res){
        resolve(res)
      }).catch(error => {
          reject(error)
      })
     })
}

export const loadCampaigns = (req, data) => {
   return new Promise((resolve, reject) => {
     req.get(`${uri}/campaigns/outbound`, data,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      ).then(function (res){
        resolve(res)
      }).catch(error => {
          reject(error)
      })
     })
}



