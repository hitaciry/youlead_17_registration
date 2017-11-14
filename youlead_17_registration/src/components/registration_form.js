import React, { Component } from 'react'
import { getUsersEmails,addUser,updateUser  } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem' 
import QRCode from 'qrcode'
import { getUserByMail } from '../actions'
import * as uuidv4 from 'uuid/v4'
import { connect } from 'react-redux'

const style = {
  margin:20,
  padding:20,
  fontSize: '400%',
  overflow:'none',
  textAlign: 'center'
}
const textFieldStyle={  fontSize: '250%',height:'150%',width:'100%'}
const mapStateToProps = (state, ownProps) => {
  console.log(state.combineReducer.emails)
  return {
      user:state.combineReducer.user,
      emails:state.combineReducer.emails
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEmails: async () => {return await getUsersEmails().then(dispatch) },
    addUser: async (user)=> {
      user.key =uuidv4()
       return await addUser(user).then(dispatch)
      }
  }
}

class RegistrationForm extends Component{

  constructor(props) {
    
    super(props)
   
    this.state = {
        secretWord: "@",
        secret:false,
        email_error:null,
        user:{
          name: null,
          section: null,
          spec: null,
          emailAddress: null,
          phone:null,
          city:null
        }
      }
    this.emailValidation= this.emailValidation.bind(this)
    this.changeState= this.changeState.bind(this)
  }
  emailValidation(e, emails){
    if(emails.some(s=>s===e.target.value))
      this.setState({email_error:'email already exist'})
    else
      this.changeState(e)
  }
  componentDidMount(){
    if(!this.props.emails)
      this.props.getEmails()
  }
  changeState(e){
    var prop={}
    prop[e.target.name]=e.target.value
    this.setState({user:Object.assign({},this.state.user,prop)})
  }  
  findUser= (event, value)=>this.props.getUser(value)
  checkSecret = (event)=>this.setState({secret:this.state.secretWord===event.target.value})
  render(){
    return !this.props.emails?
      <div>fetching emails</div>
      :      
    <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Registration! </p>
        
          <List style={style} >
          <ListItem>
          <TextField style={textFieldStyle} defaultValue={this.state.secretWord}  hintText='Input secret' type='password' val={this.state.secretWord} onChange={this.checkSecret} />
        </ListItem>
        {this.state.secret &&[
            <ListItem>
            <TextField style={textFieldStyle} name = 'email' hintText='Input email'  val={this.state.user.email} errorText={this.state.email_error} onChange={(event)=>this.emailValidation(event,this.props.emails)}/>
            </ListItem>,
            <ListItem>
            <TextField style={textFieldStyle} name = 'name' hintText='Input name' val={this.state.user.name} onChange={this.changeState} />
            </ListItem>,
            <ListItem>
            <TextField style={textFieldStyle} name = 'phone' hintText='Input phone' val={this.state.user.phone} onChange={this.changeState} />
            </ListItem>,
            <ListItem>
            <TextField style={textFieldStyle} name = 'section' hintText='Input section' val={this.state.user.section} onChange={this.changeState} />
            </ListItem>,
            <ListItem>
            <TextField style={textFieldStyle} name = 'spec' hintText='Input spec' val={this.state.user.spec} onChange={this.changeState} />
            </ListItem>,
            <ListItem>
            <TextField style={textFieldStyle} name = 'city' hintText='Input city' val={this.state.user.city} onChange={this.changeState} />
            </ListItem>,
            <ListItem>
            <TextField style={textFieldStyle} name = 'emergency_phone' hintText='Input emergency phone' val={this.state.user.emergency_phone} onChange={this.changeState} />
            </ListItem>,
            <ListItem>
            <TextField style={textFieldStyle} name = 'details' hintText='Input details' val={this.state.user.details} onChange={this.changeState} />
            </ListItem>,
            <ListItem>
            <FlatButton primary={true} style={{ height:'400%',width:'100%', overflow:'none'}} labelStyle={{marginTop:'10%',  fontSize: '100%',height:'40%',width:'100%'}} onClick={(e)=>this.props.addUser(this.state.user).then(this.setState({showlink:true}))} disabled={!this.state.user.name&&!this.state.user.emailAddress} label='Create'/>
            </ListItem>]}
          </List>
        
        {this.state.showlink &&
          <a href={`/checkin/${this.state.user.key}`}>Link to check in</a>
        }
      </Paper>
  }
} 
export default  connect(  mapStateToProps, mapDispatchToProps )( RegistrationForm )
