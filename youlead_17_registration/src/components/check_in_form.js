import React, { Component } from 'react'
import {  } from '../actions'
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
export default class CheckInForm extends Comment{
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
    let sectionGroups = this.props.masterClasses
                        .filter(f=>f.section===user.section&&new Date(f.date).getTime()===new Date().getTime())
                        .reduce((res,val)=>{(res[val.time]=res[val.time]||[]/*init this, may be we have alternative?*/).push(val); return res})   
    return
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Preregistration! </p>
        
        <TextField hintText="Input secret" val={this.state.secretWord} onChange={checkSecret} />
        {this.state.secret &&
          sectionGroups.array.forEach(function(element) {
            
          }, this)

        }
      </Paper>
  }
}  