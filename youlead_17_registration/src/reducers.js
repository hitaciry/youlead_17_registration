import { combineReducers } from 'redux'
import { UPDATE_MASTER_CLASSES,UPDATE_USER,ERROR,GET_USER,GET_USERS_EMAILS, GET } from './actions'
function combineReducer(state,action){
  switch(action.type){
    case UPDATE_MASTER_CLASSES:
    return Object.assign({},state, { masterclasses:action.masterclasses})
    case UPDATE_USER:
    return Object.assign({},state, { response:action.response})
    case GET_USER:
    return Object.assign({},state, {user:action})
    case GET_USERS_EMAILS:
    return Object.assign({},state,{emails:action})
    case ERROR:
    return Object.assign({},state,{error:action})
    default:
    return state
  }
}

const redusers = combineReducers({combineReducer})
export default redusers  
