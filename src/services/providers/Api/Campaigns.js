import * as conf from '../../config'
//import * as sessionStorage from '../SessionStorage'
//const axios = require('axios');

let uri = "/campaigns/"


  /*var axiosInstance = axios.create({
  baseURL: 'https://domain.com/foo/bar',
});*/

export const getCampaign = (req, CampaignId) => {
   return new Promise((resolve, reject) => {
     req.get(`${uri}/${CampaignId}`,
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





//module.exports = axiosInstance;

