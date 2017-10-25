import React, { Component } from 'react'
import { getUserByMail  } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'

const style = {
  margin: 'auto',
  padding: 20,
  textAlign: 'center',
  display: 'table',
}

class GetQRCodeForm extends Component{
  constructor(props) {
    super(props)
    this.changeState=this.changeState.bind(this)
  }
  changeState(e){
    var prop={}
    prop[e.target.name]=e.target.value
    this.setState(Object.assign({},this.state,prop))
  } 
  download(e){
    let canvas = document.getElementsByTagName('canvas')
    let link = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    link = link.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  
    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    link = link.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  
    this.href = link;
  } 
  render(){
    return <MuiThemeProvider>
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Preregistration! </p>
        {!this.props.user?
          <div>
            <p>Please Enter Your registration Email</p>
            <TextField name="email" hintText="Input email" type="email" onChange={this.changeState} />
            <FlatButton onClick={(e)=>this.props.getUser(this.state.email)} label="Search" />
          </div>
        :
          <div>
            <p> Thank You, <strong>{this.props.user.name}</strong>, for Preregistration!</p>
            <p> Please, show this code to our volunteers and get Your gifts</p>

            <QRCode value={window.location.protocol+'//'+window.location.host+'/checkin/'+this.props.user.key }/>
            <IconButton tooltip="Download" onClick={this.download}>
              <FontIcon className="file_download" label="Download" />
            </IconButton>
          </div>
        }
      </Paper>
      </MuiThemeProvider>
  }
} 

const mapStateToProps = (state, ownProps) => {
  return {
      user:state.combineReducer.user  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: (email) => {
      getUserByMail(email).then(dispatch)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)( GetQRCodeForm )