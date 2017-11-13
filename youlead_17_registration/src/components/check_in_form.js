import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { getUser,getMasterClassesForUser,userCheckIn,updateUser} from '../actions'

const date =(new Date()).toLocaleDateString('ru').split('.').join('')
const style = {
  margin: 20,
  padding: 20,
  height:'400%',
  width:'100%',
  fontSize:'300%',
  overflow:'none',
  textAlign: 'center'
};
 class CheckInForm extends Component{
  componentDidMount(){
    if(!this.props.user)
      this.props.getUser().then(u=>
        this.props.getMasterClassesForUser(date,u.section))   
  }
  constructor(props) {
    super(props);
    this.state = {
      secretWord: "@",
      secret:false
    }
    this.checkSecret=this.checkSecret.bind(this)
  
  }
  checkSecret = (event, value)=>this.setState({secret:this.state.secretWord===value})
  
 // window.location.protocol + "//" + window.location.host
  render(){    
    const user = this.props.user
    const masterclasses = this.props.masterclasses
    console.log(masterclasses)
    const selectMasterClassElement = (value)=>{
      return <MenuItem  key={value.key} style={{marginTop:'10%', fontSize: '400%',height:'200%',width:'100%'}} value={value.key} primaryText={`${value.name} ${value.attends}/${value.limit} `} disabled={value.isBlocked||value.attends===value.limit} />
    }
    const selectMasterClassDropDown=masterclasses?masterclasses.filter(f=>f!==undefined).map((value,index)=>{
      console.log(user[date][index],index)
      const val= (user&&user[date]&&user[date][index])? Object.keys(user[date][index])[0]:null
      const st ={ fontSize: '100%', paddingTop:'3%',width:'100%'}
      const oncl=(e,i,v) =>this.props.checkInUser(user,index,v,value.filter(f=>f.key===v)[0].name)
      return <SelectField style={{marginTop:40}} value={val} style={st} onChange={oncl} floatingLabelText={`Section ${index}`}  >
      {value.map(m=>{return selectMasterClassElement(m)}) }
      </SelectField>
    }):false  
    return <Paper style={style} zDepth={1}>
        <p>Доборо пожаловать на YouLead {new Date().getFullYear()}! </p>
        <p>{this.props.user===null?"User not found":this.props.user && this.props.user.name}</p> 
        <TextField type='password' style={{  fontSize: '100%',height:'20%',width:'100%'}} hintText="Input secret" defaultValue={this.state.secretWord} onChange={this.checkSecret} />
        <br/>
        {this.state.secret && 
            masterclasses ?<div>
            selectMasterClassDropDown
              <TextField style={{  fontSize: '100%',height:'20%',width:'100%'}} hintText ='Emergency phone' defaultValue={user.emegency_phone} onChange={(event, value)=>this.props.updateUser(Object.assign({},user,{emegency_phone:value}))} />
              <TextField style={{  fontSize: '100%',height:'20%',width:'100%'}} hintText ='Details' multiLine={true} defaultValue={user.details} onChange={(event, value)=>this.props.updateUser(Object.assign({},user,{details:value}))} />
              <RaisedButton label='Check in' />
              </div>
            :<p>Loading...</p>
        }
      </Paper>
  }
} 

const mapStateToProps = (state, ownProps) => {
  return {
      user:state.combineReducer.user,
      masterclasses:state.combineReducer.masterclasses 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    updateUser: (user)=>{
      updateUser(user).then(dispatch)
    },
    getUser: async () => {
      return getUser(ownProps.match.params.userId).then(a=>{dispatch(a);return a.user})
    },
    getMasterClassesForUser: async (date,section)=>{
      return getMasterClassesForUser(date,section).then(dispatch)
    },
    checkInUser:(user,time, masterClassId,masterClassName)=>{
      userCheckIn(user,time, masterClassId,masterClassName, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInForm  )