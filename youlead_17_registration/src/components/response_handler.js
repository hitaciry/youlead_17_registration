import React from 'react'
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const ResponseHandler = responce =>{
  return <MuiThemeProvider>
   <Snackbar 
    open={responce}
    //message={responce}
    autoHideDuration={7000}
  />
  </MuiThemeProvider>
} 
export default ResponseHandler