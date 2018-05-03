export const loadState = ( state ) => {
  try {
    const serializedState = sessionStorage.getItem('microvoz_softphone.auth')


    if( serializedState === null )
      return  undefined

    const newState = { auth: { login: JSON.parse(serializedState) } }
    return newState
  } catch (err){
    return undefined
  }
}


export const saveState = ( state ) => {
  try{
    //if(typeof state.auth.login.data.access_token !== "undefined"){
      //const serializedState = JSON.stringify(state.auth.login)
      //sessionStorage.setItem("microvoz_softphone.auth", serializedState)
    //}
  } catch ( err ){
    alert("error")

  }
}


