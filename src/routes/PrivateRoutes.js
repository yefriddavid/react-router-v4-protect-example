import { fakeAuth } from '../http/fakeAuth'
import React, { Component } from 'react'


import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';



export const PrivateRoutes = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated(props)
      ? props.location.search.indexOf("p=") > 0 ?
         <Redirect to={{
           pathname: '/n/nut',
            state: { from: props.location }
          }} />
        : <Component {...props} />
      : <Redirect to={{
        pathname: props.location.search.indexOf("p=") > 0 ? '/n/nut':'/n/login',
          state: { from: props.location }
        }} />
  )} />
)


export const FriendlyRoutes = ({ component: Component, ...rest }) => {
  //console.log(Component)

  return (
    <Route {...rest} render={(props) => (
      fakeAuth.isAuthenticated(props)
        ? props.location.search.indexOf("p=") > 0 ?
           <Redirect to={{ pathname: '/n/nut', state: { from: props.location }}} />
          : <Component {...props} />
          //: false ? <Redirect to={{pathname: '/n/accessing', state: { from: props.location }}} /> : <Component {...props} />
        : <Redirect to={{ pathname: props.location.search.indexOf("p=") > 0 ? '/n/nut':'/n/login', state: { from: props.location }}} />
    )} />
  )
}



