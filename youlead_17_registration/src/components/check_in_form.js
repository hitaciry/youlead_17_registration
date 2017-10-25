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
      this.props.getUser().then((r)=>{
        return this.props.getMasterClassesForUser(date,this.props.user.section)})
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
    const masterclasses = this.props.masterclasses
    console.log(masterclasses)
    const selectMasterClassElement = (value)=>{
      return <MenuItem key={value.key} index={value.key} style={{marginTop:'10%', fontSize: '400%',height:'200%',width:'100%'}} value={{key:value.key,name:value.name}} primaryText={`${value.name} ${value.attends}/${value.limit} `} disabled={value.isBlocked||value.attends===value.limit} />
    }
    const selectMasterClassDropDown=masterclasses?masterclasses.filter(f=>f!==undefined).map((value,index)=>{      
      return <SelectField value={} labelStyle={{}} style={{ marginTop:'20%', paddingTop:'3%', marginBottom:'10%', fontSize: '70%',width:'100%'}} onChange={(e,i,v) =>this.props.checkInUser(user,i,v.key,v.name)} floatingLabelText={`Section ${index}`}  >
      {value.map(m=>{return selectMasterClassElement(m)}) }
      </SelectField>
    }):false  
    return<MuiThemeProvider>
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Checkin page! </p>
        
        <TextField style={{marginTop:'10%',  fontSize: '100%',height:'20%',width:'100%'}} hintText="Input secret" defaultValue={this.state.secretWord} onChange={this.checkSecret} />
        <br/>
        {this.state.secret && 
          <div>
          {masterclasses ?
          selectMasterClassDropDown?
            selectMasterClassDropDown:
            <RaisedButton label='Check in' />        

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
  return {
      user:state.combineReducer.user,
      masterclasses:!state.combineReducer.masterclasses?null:Object.values(state.combineReducer.masterclasses)  
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
    checkInUser:(user,time, masterClassId,masterClassName)=>{
      userCheckIn(user,time, masterClassId,masterClassName, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInForm  )