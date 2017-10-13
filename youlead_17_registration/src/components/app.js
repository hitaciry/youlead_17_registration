
import * as getQRCode from './get_qr_code_form'
import * as registration from'./registration_form'
import * as checkin from './check_in_form'
import * as errorHandler from './error_handler'
import * as responceHandler from './response_handler'
import * as dashboard from './dashboard'
import { Router, Route, browserHistory } from 'react-router'

const App = ( store)=>{
    <div>
        <errorHandler errror={store.getState().error}/>
        <responceHandler responce={store.getState().responce} />
        {/* Tell the Router to use our enhanced history */} 
        <Router history={browserHistory} >
        
            <Route path="/getqrcode" render={()=> <getQRCode user={store.getState().user} />}/>
            <Route path="/registration" component={()=><registration/>}/>
            <Route path="/checkin/(:userId)" component={checkin}/>
            <Route path="/dashboard" component={dashboard}/>
        </Router>
    </div>
}
export default App;