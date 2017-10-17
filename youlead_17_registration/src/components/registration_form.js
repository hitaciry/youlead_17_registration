import React, { Component } from 'react'
import { getUsersEmails,addUser,updateUser  } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import QRCode from 'qrcode'
import { getUserByMail } from '../actions'
import { v4 } from 'node-uuid'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const style = {
  height: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}

const mapStateToProps = (state, ownProps) => {
  return {
      user:state.user,
      emails:state.emails  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEmails: async () => { dispatch(await getUsersEmails()) },
    addUser: async (user)=> {dispatch(await addUser(user))}
  }
}

class RegistrationForm extends Component{
  constructor(props) {
    super(props);
    if(!this.props.emails)
        {
      this.state = {fetchingEmails:true}
      this.props.getEmails().then(
        this.state = {
        fetchingEmails:false,
        secretWord: "my secret",
        secret:false,
        email_error:null,
        user:{
          id: new v4(),
          name: null,
          section: null,
          email: null
        }  }
      )
    }
    else
      this.state = {
        secretWord: "my secret",
        secret:false,
        email_error:null,
        user:{
          id: new v4(),
          name: null,
          section: null,
          email: null
        }      
    };
  }
  emailValidation(e){
    if(this.props.emails.contains(e.target.value))
      this.setState({email_error:'email already exist'})
    else
      this.changeSate(e)
  }
  changeSate(e){
    this.setState({user:{[e.target.name]:e.targrt.value}})
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
        
        <TextField hintText='Input secret' type='password' val={this.state.secretWord} onChange={this.checkSecret} />
        {this.state.secret &&
          <div>
            <TextField name = 'email' hintText='Input email'  val={this.state.user.email} errerrorText={this.state.email_error} onChange={this.emailValidation} />
            <TextField name = 'name' hintText='Input name' val={this.state.user.name} onChange={this.changeSate} />
            <TextField name = 'section' hintText='Input section' val={this.state.user.section} onChange={this.changeSate} />
            <FlatButton onClick={(e)=>this.props.addUser(this.state.user)} label='Create'/>
          </div>
        }
      </Paper>
      }
      </MuiThemeProvider>
  }
} 
export default  connect(  mapStateToProps, mapDispatchToProps )( RegistrationForm )
