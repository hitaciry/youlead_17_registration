import React, { Component } from 'react'
import {  } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';

const style = {
  height: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
export default class GetQRCodeForm extends Comment{
  componentDidMount() {
    st
  }
  download(){

  }
  makeCanvas(){

  } 
 // window.location.protocol + "//" + window.location.host
  render(){
    return
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Preregistration! </p>
        if(!this.props.user){
        <p>Please Enter Your registration Email</p>
        }
        else
        {
          <p> Thank You for Preregistration!</p>
          <p> Please, show this code to our volunteers and get Your gifts</p>

          <canvas id="canvas" />
          <IconButton tooltip="Download" onClick={this.download()}>
            <FontIcon className="file_download" />
          </IconButton>
        }
      </Paper>
  }
}  