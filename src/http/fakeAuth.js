
export const fakeAuth = {
  isAuthenticated(){
    const authData = sessionStorage.getItem("microvoz_softphone.auth")
    if(authData === null)
      return false
    else
      return true
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
