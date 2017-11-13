
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'
import React, { Component } from 'react'
import { getUserByMail  } from '../actions'
import Paper from 'material-ui/Paper'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'

const style = {
  padding: 20,
  textAlign: 'center',
  fontSize:'300%',
  width:'100%'
}
const textFieldStyle={  fontSize: '100%',height:'20%',width:'100%'}
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
  download(e,name){
    let canvas = document.getElementsByTagName('canvas')[0]
    let link = canvas.toDataURL('image/png')
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    link = link.replace(/^data:image\/[^;]*/, 'data:application/octet-stream')
  
    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    link = link.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
    const linkTag=    document.getElementById('link')
    linkTag.href = link
    linkTag.download =name+' YouLead.png'
    linkTag.click()
  } 
  render(){
    return <MuiThemeProvider>
      <Paper style={style} zDepth={1}>
        <p>Добро пожаловать на страницу предварительной регистрации YouLead {new Date().getFullYear()}! </p>
        {!this.props.user?
          <div>
            <p>Пожалуйста, введите ваш Email</p>
            <br/>
            <TextField style={textFieldStyle} name="email" hintText="Введите email" type="email" onChange={this.changeState} />
            <br/>
            <FlatButton style={{ height:'400%', overflow:'none', textAlign:'right' }} labelStyle={{marginTop:'10%',  fontSize: '100%',height:'40%'}} onClick={(e)=>this.props.getUser(this.state.email)} label="Поиск" />
          </div>
        :
          <div>
            <p> Спасибо, <strong>{this.props.user.name}</strong>!<br/>
             Пожалуйста, предъявите данный код волонтерам на площадке форума</p>

            <QRCode size={512} value={window.location.protocol+'//'+window.location.host+'/checkin/'+this.props.user.key }/><br/>
            <a id='link' href="#" ></a><IconButton style={{ width: 220, height: 220, padding: 30}} iconStyle={{width: 160, height: 160,}} tooltip="Download" onClick={(e)=>this.download(e,this.props.user.name)} >
              <FileFileDownload/>
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