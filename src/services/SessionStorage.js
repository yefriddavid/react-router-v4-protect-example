

let localStorage
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = global.window.localStorage
} else {
  //alert("holaaaa")
  localStorage = sessionStorage
}

export const getRefreshToken = () => {
  const { refresh_token } = getDataStorage() || { refresh_token: false }
  return refresh_token
}
export const getAccessToken = () => {
  //alert("5555")
  const { access_token } = getDataStorage() || { access_token: false }
  return access_token
}

export function getDataStorage(){

  if( loggedIn() === false )
    return  undefined

  const serializedState = localStorage.getItem('microvoz_softphone.auth')
  return JSON.parse(serializedState)
}

export function setDataStorage(data){
  sessionStorage.removeItem('microvoz_softphone.auth')
  const serializedState = JSON.stringify(data)
  localStorage.setItem("microvoz_softphone.auth", serializedState)
  return true
}
export const getBeginAt = () => {
  const { beginAt } = getDataStorage() || { beginAt: false }
  return beginAt
}
export const getFinishAt = () => {
  const { finishAt } = getDataStorage() || { finishAt: false }
  return finishAt
}


export function loggedIn() {
  const serializedState = localStorage.getItem("microvoz_softphone.auth")
  if( serializedState === null )
    return false
  else
    return true

}

export function getHeaders(){
  let headers = []
  headers['Authorization'] = 'Bearer ' + getAccessToken()
  return headers
}
export const clearSignData = (data) => {
  localStorage.removeItem('microvoz_softphone.auth')
}
export function fullLoggedIn() {
  if(loggedIn() === true){
    let beginAt = getBeginAt()
    let finishAt = getFinishAt()
    if(beginAt !== false && finishAt !== false){
      if(beginAt < finishAt){
        return true
      }
    }
  }

  return false
}


