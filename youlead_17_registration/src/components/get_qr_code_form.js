import React, { Component } from 'react'
import { getUserByMail  } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import QRCode from 'qrcode'
import { connect } from 'react-redux'

const style = {
  height: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}

class GetQRCodeForm extends Comment{
  componentDidMount() {
    if (this.props.user){
      let canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas,window.location.protocol+'//'+window.location.host+'/checkin/'+this.props.user.id,  error=> {
        //TODO: remove on Prod mode
        console.log(error?error:'success!');
      })
    }
  }
  download(){
    let canvas = document.getElementById('canvas')
    let link = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    link = link.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  
    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    link = link.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  
    this.href = link;
  } 
  findUser= (event)=>this.props.getUser(event.target.value)
  render(){
    return
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Preregistration! </p>
        {!this.props.user?
          <div>
            <p>Please Enter Your registration Email</p>
            <TextField hintText="Input email" type="email" onChange={this.findUser} />
          </div>
        :
          <div>
            <p> Thank You, <strong>{this.props.user.name}</strong>, for Preregistration!</p>
            <p> Please, show this code to our volunteers and get Your gifts</p>

            <img src="/qr" alt="qrcode"/>
            <IconButton tooltip="Download" onClick={this.download}>
              <FontIcon className="file_download" />
            </IconButton>
          </div>
        }
      </Paper>
  }
} 

const mapStateToProps = (state, ownProps) => {
  return {
      user:state.user  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: (email) => {
      dispatch(getUserByMail(email))
    }
  }
}
export default  connect(  mapStateToProps, mapDispatchToProps)( GetQRCodeForm )