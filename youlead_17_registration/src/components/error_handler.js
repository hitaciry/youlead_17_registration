import React from 'react'
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const ErrorHandler = error =>{
  console.log(error)
  return <MuiThemeProvider>
  <Snackbar 
    open={error}
    //message={error}
    autoHideDuration={5000}
  />
  </MuiThemeProvider>
} 
export default ErrorHandler