//import axios from 'axios'
import Request from './Request'
import * as apiServices from './Api'


//const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
//const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkzOTBhNDhkZTc0YzE5Y2E1YmYzYmVmNDgwYjI5MzU2MjZiOWU4YzdiNjM5YTEwOWExNTc4MWMzYmI2MGI1ZDVmNjMxYWRkNTQ3OWUxYmZkIn0.eyJhdWQiOiIxIiwianRpIjoiOTM5MGE0OGRlNzRjMTljYTViZjNiZWY0ODBiMjkzNTYyNmI5ZThjN2I2MzlhMTA5YTE1NzgxYzNiYjYwYjVkNWY2MzFhZGQ1NDc5ZTFiZmQiLCJpYXQiOjE1MTg3MTI4OTMsIm5iZiI6MTUxODcxMjg5MywiZXhwIjoxNTUwMjQ4ODkzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.nIi1hlQSeta3szXo1M21GYb0Q4n7emCEe1Kz83UvzYXNRTsDE5LApg20swjSBnf0aco-WIt7a5ML7UKHS6uH69itsSKaJ4tFWvTB2tzyKO0bWso0S6NhhiQAJmHukXcAtWmH4O8xklWMgtr4RECJ9hXfb1nMWJV9k6WcmNzoibjRN3Cjf4E82G1GfLAWqlGVirtLfdQhQXYiiCva3nwmyWrwyRcch0-QfVaNapSCit6IptfOT0pWwpNMpa5MvbX7Ty2ERm6KZK7it2jWoAcFyJX7cUMrFaODCsgCFW5HAp1_RWaC2WPD6O6q2reNaEA9EfuSRWkIpIAjLnGIGJDAcb7fdvdqJGDRZk75oTqN1YpOIBlXjkpdgQO1mUL1E70Ct4VTLNCjesszoECMTt8-rcCIY-E6wrjS0oNLiK7zvYanzjE9bYDkJDrCdHeibFij_P9mHLYIRufbb4Hb0g8nwmDWUwxcLhLhcbhqsR25WlwCimLLgmHBGQXKxCPTzsvD5bHGWn06XSZmhJn43MKC0n_DNMZRX_4K-2t1QLIXYe3Q1KpZDI3jXiBTrCXRKHdlhNKjAnMOfRaM_53LMfSLee2B0aBO5pLKp5oX3LtvmHkJpl3YdsLzBq_aAs-a3a5tYhGxHxR3EEPcvhobPf9xgWu3O5UMty4DzEalBp59ZF0'
//const API_CLIENT_ID = '3'
//const API_CLIENT_SECRET = 'GW3LcKTXq8F8d5ujr1vIes9l0nZ5nDLghCyL0xMk'

export const fetchInteract = (interactId) => {
  return Request.get(`/interactions/${interactId}`,
    {
      method:"GET",
      headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
    }
  ).then(function (response){
    if(response.data.default_form_data === null)
      response.data.default_form_data = {}

    return response.data;
  });
};


export const fetchForm = (formId) => {
  //return axios.get("http://104.236.144.125:81/api" + `/form/${formId}`,
  return Request.get(`/forms/${formId}`,
    {
      method:"GET",
      headers: {
        'Accept': 'application/json'
      },
    }
  ).then(function (response){
    return response.data;
  });
};

export const fetchInteracts = (userId) => {

  /*return fetch("http://10.10.0.60:81/api/users", {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNhMWJiZjI4M2JmYzFlYmUwOTM4NGQ5ZjhhOWQ2NWNiMWYzOWVkNWIyYWQ4MDhiZmE4NzIwNWIwZjNmZDMyNzU2MjRlYzAwOGQ1ZjY1YTFkIn0.eyJhdWQiOiIzIiwianRpIjoiY2ExYmJmMjgzYmZjMWViZTA5Mzg0ZDlmOGE5ZDY1Y2IxZjM5ZWQ1YjJhZDgwOGJmYTg3MjA1YjBmM2ZkMzI3NTYyNGVjMDA4ZDVmNjVhMWQiLCJpYXQiOjE1MTA2MDYwNDIsIm5iZiI6MTUxMDYwNjA0MiwiZXhwIjoxNTQyMTQyMDQyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.a2UntaOs0QGDUmWAxrZMCMOCigJTXCRO6uhtNLTzZ5M3ZU3re1p4sgXCxQ6VIVrLo-cXk_VB_5pPFhLHq6vgsUdqNkSthcxs6PtcISfwPfv9Eq4rozuP3RiKZxUrCEg84E7CtzzR2pMVGLTYadWM_5WwdKxZG-7SEDujrLnW0z-kiYO3BPv0fUtRJe1oHv5cPQB8MQZivt7PdCrZbH_-RxqpoMslVkohNLgBootEqa8uM1tlukRfiNn9sG7KAC7uKyuyhwRCKR79z9P60KVHnKKKz8fWn8M3DDJcQPlU9pvqKX5bO2jpD65x_AFX3hx0CgcH1wRf_YTG09ha1GjslTSRQgauneEI81Bg-IJEqtrrC2KoOchcEM51HMSavDd0jHLvRPkNLa1Z97pUuQY0ZyOW8w0Pmw3JhekU7cS_xSiDBT1aXQWlPBfPiW1qSBS2cMBMUwnBkzTba5H2cOSPr2R45GOQ7j_VNiaN27gFfBdfOkWTB3DxhXFRQ4OMi7n7IgAdocJhn0RE-3pkToQjTNofXjcMrsL8r0UsDUx3iyvB6PU_wZKQUApMKRkPDt_jFXnKzw63AULkzbh4Y7Cs-5PdfGGXv0zMk-6-EjiWR6cftunwBaaaZA0Te8jnwkJ7JiHkF-4-2s7jtFjF7LyQaDARmfmTJ2iUfeTTFijbGWQ' //,
      //'Content-Type': 'application/x-www-form-urlencoded'
    },
  });*/

  return Request.get(`/users/${userId}/interactions`,
  //return axios.get(API_ENDPOINT + `/agents/25/interactions`,
    {
      method:"GET",
      headers: {
        //'Authorization': 'Bearer ' + apiServices.getAccessToken() //sessionStorage.getItem("access_token")
        'Authorization': 'Bearer ' sessionStorage.getItem("access_token")
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
    }
  ).then(function (response) {
    return response.data;
    return [
          {id:1, isActive: true,phoneNumber:"+57 034 2221294",receiverFullName:"Jessica Daniela Rios Mora",origin:"xxxxx-xxx", type: "a"},
          {id:2, phoneNumber:"+57 034 2221294",receiverFullName:"Jessica Daniela Rios Mora",origin:"xxxxx-xxx", type: "b"},
          {id:3, isActive: false,phoneNumber:"+57 034 2221294",receiverFullName:"Carmen mora",origin:"xxxxx-xxx", type: "c"}
        ];


    return response.json().then(function (json) {
      return json.photos.photo.map(
        //({farm, server, id, secret}) => `https://farm.staticflickr.com/${server}/${id}_${secret}.jpg`
        ({farm, server, id, secret}) => `https://farm.staticflickr.com/`
      );
    })
  })
};
export const fetchInteracta = (interactId) => {
  return fetch(`/interacts/${interactId}`,
    {
      method: "GET",
      headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
    }
  ).then(function (response) {
    return response;
    /*return response.json().then(function (json) {
      return json.photos.photo.map(
        //({farm, server, id, secret}) => `https://farm.staticflickr.com/${server}/${id}_${secret}.jpg`
        ({farm, server, id, secret}) => `https://farm.staticflickr.com/`
      );
    })*/
  })
};



