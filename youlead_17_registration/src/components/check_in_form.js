import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { getUser,getMasterClassesForUser,userCheckIn} from '../actions'

const date =(new Date()).toLocaleDateString('ru').split('.').join('')
const style = {
  margin: 20,
  padding: 20,
  fontSize: '500%',
  height:'100%'
};
 class CheckInForm extends Component{
  componentDidMount(){
    if(!this.props.user){
      this.props.getUser().then(r=>{      
        this.props.getMasterClassesForUser(date,this.props.user.section)
      })
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      secretWord: "my secret",
      secret:false
    }
    this.checkSecret=this.checkSecret.bind(this)
  
  }
  checkSecret = (event, value)=>this.setState({secret:this.state.secretWord===value})
  
 // window.location.protocol + "//" + window.location.host
  render(){    
    const user = this.props.user
    const masterClasses = this.props.masterClasses
    const selectMasterClassElement = (value)=>{
      console.log(value)
      return <MenuItem /*index={index}*/ style={{marginTop:'10%', fontSize: '400%',height:'200%',width:'100%'}} value={value.name} primaryText={`${value.name} ${value.attends}/${value.limit} `} disabled={value.isBlocked||value.attends===value.limit} />
    }
      // <SelectField onChange={(e,i,v) => this.props.checkInUser(user,masterClasses[i].name,index)}>
      // {masterClasses.map(selectMasterClassElement)}
      // </SelectField>
    const selectMasterClassDropDown=masterClasses?masterClasses.map((value,index)=>{
      return    <SelectField value={user[date]?user[date][index]:null} labelStyle={{}} style={{ marginTop:'20%', paddingTop:'3%', marginBottom:'10%', fontSize: '70%',width:'100%'}} floatingLabelText={`Section ${index}`} onChange={(e,i,v) => {this.props.checkInUser(user,v,index)}}>
      {Object.keys(value).map(key=>selectMasterClassElement(value[key])) }
      </SelectField>
    }):null  
    return<MuiThemeProvider>
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Checkin page! </p>
        
        <TextField style={{marginTop:'10%',  fontSize: '100%',height:'20%',width:'100%'}} hintText="Input secret" defaultValue={this.state.secretWord} onChange={this.checkSecret} />
        <br/>
        {this.state.secret && 
          <div>
          {masterClasses ?
          selectMasterClassDropDown
          :
          <div>Loading...</div>
          }
          </div>
        }
      </Paper>
      </MuiThemeProvider>
  }
} 

const mapStateToProps = (state, ownProps) => {
  console.log(state.combineReducer)
  return {
      user:state.combineReducer.user,
      masterClasses:state.combineReducer.masterclasses  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    getUser: async () => {
      return getUser(ownProps.match.params.userId).then(dispatch)
    },
    getMasterClassesForUser: async (date,section)=>{
      return getMasterClassesForUser(date,section).then(dispatch)
    },
    checkInUser:(user,masterClassName,masterClassTime)=>{
      userCheckIn(user,masterClassName,masterClassTime, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInForm  )