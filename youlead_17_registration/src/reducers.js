import { combineReducers } from 'redux'
import { UPDATE_MASTER_CLASSES,UPDATE_USER,ERROR,GET_USER,GET_USERS_EMAILS, INCREMENT_MASTER_CLASS, d } from './actions'
function combineReducer(state,action){
  switch(action.type){
    case UPDATE_MASTER_CLASSES:
    return Object.assign({},state, { masterclasses:action.masterclasses})
    case UPDATE_USER, IN:
    return Object.assign({},state, { response:action.response})
    case GET_USER:
    return Object.assign({},state, {user:action.user})
    case GET_USERS_EMAILS:
    return Object.assign({},state,{emails:action.emails})
    case ERROR:
    return Object.assign({},state,{error:action})
    default:
    return state
  }
}

const redusers = combineReducers({combineReducer})
export default redusers  
