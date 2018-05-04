//import ReactGA from 'react-ga'

const options = {}

  /*const trackPage = (page) => {
  ReactGA.set({
    page,
    ...options
  })
  ReactGA.pageview(page)
}*/

let currentPage = ''

export const routesMiddleware = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    //alert("xxxxx")
    /*const nextPage = `${action.payload.pathname}${action.payload.search}`

    if (currentPage !== nextPage) {
      currentPage = nextPage
      trackPage(nextPage)
    }*/
  }
  /*console.log("hola mundo I am the middleware")
  console.log(action.type)
  console.log(action)
  console.log(store)
  console.log(next)*/

  console.log(action)
  return next(action)
}


