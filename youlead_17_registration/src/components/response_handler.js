import React from 'react'
import Snackbar from 'material-ui/Snackbar';

const ResponceHandler = responce =>{
  <Snackbar 
    open={responce}
    message={responce}
    autoHideDuration={7000}
  />
} 
export default ResponceHandler