import React from 'react'
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux'
const ErrorHandler = ({error}) =>{
  return<div> {error&&<Snackbar 
    open={true}
    message={error}
    autoHideDuration={5000}
  />}</div>
} 
const mapStateToProps=(state,ownProps)=>{
  return{error:state.combineReducer&&state.combineReducer.error}
}
export default connect(mapStateToProps,{}) (ErrorHandler)