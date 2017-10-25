import React, { Component } from 'react'
import { getUsersEmails,addUser,updateUser  } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import QRCode from 'qrcode'
import { getUserByMail } from '../actions'
import * as uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const style = {
  margin:'5%',
  fontSize: '500%',
  height:'100%',
  overflow:'none',
  textAlign: 'center'
}
const textFieldStyle={marginTop:'10%',  fontSize: '100%',height:'20%',width:'100%'}
const mapStateToProps = (state, ownProps) => {
  return {
      user:state.combineReducer.user,
      emails:state.combineReducer.emails
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEmails: async () => {return await getUsersEmails().then(dispatch) },
    addUser: async (user)=> { return await addUser(user).then(dispatch)}
  }
}

class RegistrationForm extends Component{

  constructor(props) {
    super(props)
    console.log('props', this.props)
    if(!props.emails)
        {
      this.state = {fetchingEmails:true}
      this.props.getEmails().then(
        this.state = {fetchingEmails:false,
        emails:props.emails,
        secretWord: "my secret",
        secret:false,
        email_error:null,
        user:{
          id: uuidv4(),
          name: null,
          section: null,
          emailAddress: null } 
        } )
    } 
    this.state = {
        emails:props.emails,
        secretWord: "my secret",
        secret:false,
        email_error:null,
        user:{
          key: uuidv4(),
          name: null,
          section: null,
          emailAddress: null
        }
      }
    console.log(this.state)
    this.emailValidation= this.emailValidation.bind(this)
    this.changeState= this.changeState.bind(this)
  }
  emailValidation(e, emails){
    if(emails.some(s=>s===e.target.value))
      this.setState({email_error:'email already exist'})
    else
      this.changeState(e)
  }
  changeState(e){
    var prop={}
    prop[e.target.name]=e.target.value
    this.setState({user:Object.assign({},this.state.user,prop)})
  }  
  findUser= (event, value)=>this.props.getUser(value)
  checkSecret = (event)=>this.setState({secret:this.state.secretWord===event.target.value})
  render(){
    return <MuiThemeProvider>
    {this.state.fetchingEmails?
      <div>fetching emails</div>
      :      
    <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Registration! </p>
        
        <TextField style={textFieldStyle} defaultValue={this.state.secretWord}  hintText='Input secret' type='password' val={this.state.secretWord} onChange={this.checkSecret} />
        {this.state.secret &&
          <div>
            <TextField style={textFieldStyle} name = 'email' floatingLabelText='Input email'  val={this.state.user.email} errorText={this.state.email_error} onChange={(event)=>this.emailValidation(event,this.props.emails)}/>
            <TextField style={textFieldStyle} name = 'name' floatingLabelText='Input name' val={this.state.user.name} onChange={this.changeState} />
            <TextField style={textFieldStyle} name = 'section' floatingLabelText='Input section' val={this.state.user.section} onChange={this.changeState} />
            <FlatButton primary={true} style={{ height:'400%',width:'100%', overflow:'none', margin:'10%'}} labelStyle={{marginTop:'10%',  fontSize: '100%',height:'40%',width:'100%'}} onClick={(e)=>this.props.addUser(this.state.user).then(this.setState({showlink:true}))} label='Create'/>
          </div>
        }
        {this.state.showlink &&
          <a href={`/checkin/${this.state.user.key}`}>Link to check in</a>
        }
      </Paper>
      }
      </MuiThemeProvider>
  }
} 
export default  connect(  mapStateToProps, mapDispatchToProps )( RegistrationForm )
