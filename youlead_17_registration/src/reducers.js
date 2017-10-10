import { combineReducers } from 'redux'
import { UPDATE_MASTER_CLASSES,UPDATE_USER,ERROR,GET_USER,GET_USERS_EMAILS, GET } from './actions'
function reducer_(state,action){
  switch(action.type){
    case UPDATE_MASTER_CLASSES:
    return {user:state.user, masterclasses:action.masterclasses}
    case UPDATE_USER:
    return {user:action.user, response:action.response, masterclasses:state.masterclasses}
    case GET_USER:
    return {user:action, masterclasses:state.masterclasses}
    case GET_USERS_EMAILS:
    return {emails:action}
    case ERROR:
    return {error:action}
    default:
    return state
  }
}
const redusers = combineReducers({reducer_})
export default redusers  
