import { combineReducers } from 'redux'
import auth from '../reducers/authReducer'


const combinedReducers = combineReducers({
  auth,
});

export default combinedReducers

