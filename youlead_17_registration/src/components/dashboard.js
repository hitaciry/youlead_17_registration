import React, { Component } from 'react'
import {Route, BrowserRouter,Switch} from 'react-router-dom'

import {Tabs, Tab} from 'material-ui/Tabs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Dashboard =({history,children})=>(
  <MuiThemeProvider>
        <p>Welcome to YouLead {new Date().getFullYear()} Preregistration! </p>
        <Tabs >
          <Tab label="Attendee"
          value='/dashboard/users'
          onActive={()=>{history.push('/dashboard/users')}} 
          />

          <Tab label="Master Classes"
          value='/dashboard/masterclass'
          onActive={()=>{history.push('/dashboard/masterclass')}}
          />            
        </Tabs>
{children}
    </MuiThemeProvider>
  )

export default Dashboard