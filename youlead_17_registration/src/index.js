import reducers from './reducers'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import * as getQRCode from './components/get_qr_code_form'
import * as registration from'./components/registration_form'
import * as checkin from './components/check_in_form'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
        <Route path="/getqrcode" component={getQRCode}/>
        <Route path="/registration" component={registration}/>
        <Route path="/checkin/(:userId)" component={checkin}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)