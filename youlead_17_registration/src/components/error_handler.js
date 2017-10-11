
import Snackbar from 'material-ui/Snackbar';

const ErrorHandler = error =>{
  <Snackbar 
    open={error}
    message={error}
    autoHideDuration={5000}
  />
} 
export default ErrorHandler