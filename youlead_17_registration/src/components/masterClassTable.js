import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  getMasterClasses,changeRegistrationState } from '../actions'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const date = new Date().toLocaleDateString('ru').split('.').join('')

const mapStateToProps = (state, ownProps) => {
  return {
      masterclasses: !state.combineReducer.masterclasses?null:Object.values(state.combineReducer.masterclasses)  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeRegistrationState: async (path,state)=> {return changeRegistrationState(path,state).then(dispatch).then(getMasterClasses).then(dispatch)},
    getMasterClasses:async ()=>{ return getMasterClasses().then(dispatch)}
  }
}
class MasterClassTable extends Component{

  componentDidMount() {
    if(!this.props.masterClasses)
      this.props.getMasterClasses()
  }
  render(){
    return<MuiThemeProvider>           
            <Table>
              <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Section</TableHeaderColumn>
                <TableHeaderColumn>Time period</TableHeaderColumn>
                <TableHeaderColumn>Is blocked</TableHeaderColumn>
                <TableHeaderColumn>Attendee</TableHeaderColumn>
                <TableHeaderColumn>Limit</TableHeaderColumn>
              </TableRow>
              </TableHeader>
              <TableBody>
              {this.props.masterclasses && this.props.masterclasses.map(item=>{                
               return <TableRow style={{textAlign:'center'}}>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{date}</TableRowColumn>
                  <TableRowColumn>{item.section}</TableRowColumn>
                  <TableRowColumn>{item.time}</TableRowColumn>
                  <TableRowColumn>        
                    <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    checked={item.isBlocked}
                    onCheck={(e)=>this.props.changeRegistrationState(item.key,item.isBlocked)}
                  />
                  </TableRowColumn>
                  <TableRowColumn style={{textAlign:'center'}}>{item.attends}</TableRowColumn>
                  <TableRowColumn>{item.limit}</TableRowColumn>
                </TableRow>
              })}              
             </TableBody>
            </Table>
    </MuiThemeProvider>
  }
} 
export default  connect(  mapStateToProps,
  mapDispatchToProps)(MasterClassTable)