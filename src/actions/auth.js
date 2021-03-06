import { createAction } from 'redux-act'

export const login = createAction('auth login')
export const logout = createAction('auth logout')
export const clear = createAction('auth clear data')
export const request = createAction('auth request')
export const received = createAction('auth received')
export const errorRequest = createAction('auth errorRequest')

export const signout = createAction('auth signout')
export const signin = createAction('auth sirnin')
export const refresh = createAction('auth refresh')

export const loginSuccessful = createAction('auth successful')
export const logoutSuccessful = createAction('auth logout successful')



