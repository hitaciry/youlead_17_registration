
import * as getQRCode from './get_qr_code_form'
import RegistrationForm from'./registration_form'
import * as checkin from './check_in_form'
import * as errorHandler from './error_handler'
import * as responceHandler from './response_handler'
import * as dashboard from './dashboard'
import {Link,Route, BrowserRouter,Switch } from 'react-router-dom'
import React from 'react'

const App = store=>{

return(
     <div>
        <errorHandler errror={store.error}/>
        <responceHandler responce={store.responce} />
        {/* Tell the Router to use our enhanced history */} 
        <BrowserRouter > 
            <Switch>       
            <Route path="/getqrcode" render={()=> <getQRCode user={store.user} />}/>
            <Route path="/registration" component={RegistrationForm}/>
            <Route path="/checkin/(:userId)" component={checkin}/>
            <Route path="/dashboard" component={dashboard}/>
            <Route exact path="/">
                <div>
                    <Link to="/getqrcode" >qr code</Link>
                    <Link to="/registration">registration</Link>
                    <Link to="/checkin/(:userId)">check in</Link>
                    <Link to="/dashboard" >dashboard</Link>
                </div>
            </Route>
            </Switch>
        </BrowserRouter>
    </div>
)}
export default App