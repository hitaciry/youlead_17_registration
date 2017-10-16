import React, { Component } from 'react'
import { getUsersEmails,addUser  } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import QRCode from 'qrcode'
import { getUserByMail } from '../actions'
import { v4 } from 'node-uuid'

const style = {
  height: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
      user:state.user  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEmails: (email) => { dispatch(getUserByMail(email)) },
    addUser: (user)=> { dicpatch(addUser(user)) }
  }
}

class RegistrationForm extends Comment{
  constructor(props) {
    super(props);
    
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
    if(this.props.getEmails.contains(e.target.value))
      this.setState({email_error:'email already exist'})
    else
      changeSate(e)
  }
  changeSate(e){
    this.setState({user:{[e.target.name]:e.targrt.value}})
  }  
  findUser= (event, value)=>this.props.getUser(value)
  render(){
    return
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Registration! </p>
        
        <TextField hintText='Input secret' type='password' val={this.state.secretWord} onChange={checkSecret} />
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
} 
export default  connect(  mapStateToProps, mapDispatchToProps )( RegistrationForm )
