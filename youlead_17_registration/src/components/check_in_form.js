import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  height: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
 class CheckInForm extends Comment{
  componentWillMount(){
    if(!this.props.user)
      getUser()
  }
  constructor(props) {
    super(props);
    this.state = {
      secretWord: "my secret",
      secret:false
    };
  }
  checkSecret = (event, value)=>this.setState({secret:this.state.secretWord===value})
  
 // window.location.protocol + "//" + window.location.host
  render(){
    let user = this.props.user
    //groupping masterclasses
    let sectionGroups = this.props.masterClasses[user.section]
                        .filter(f=>f.section===user.section&&new Date(f.date).getTime()===new Date().getTime())
                        .reduce((res,val)=>{(res[val.time]=res[val.time]||[]/*init this, may be we have alternative?*/).push(val); return res})   
    return
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Preregistration! </p>
        
        <TextField hintText="Input secret" val={this.state.secretWord} onChange={checkSecret} />
        {this.state.secret &&
          sectionGroups.map((index,groupedMasterclass)=>
          //how to send selected value and group index
            <SelectField onChange={(e,i,v) => this.props.checkInUser(user,groupedMasterclass[i],index)}>
              {groupedMasterclass.map((index,value)=>
                <MenuItem index={index} value={`${value.name} ${value.attends}/${value.limit}`} disabled={value.isBlocked||value.attends===value.limit} />
              )}        
            </SelectField>
          )
        }
      </Paper>
  }
} 
import {connect} from 'redux'
import { getUser,getMasterclasses } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
      user:state.user,
      masterClasses:state.MasterClasses  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: () => {
      dispatch(getUser(ownProps.userId))
    },
    getMasterclasses: ()=>{
      dispatch(getMasterclasses())
    }
  }
}

export default CheckInForm  