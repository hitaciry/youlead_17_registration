import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers, getMasterClasses,changeRegistrationState } from '../actions'
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {Tabs, Tab} from 'material-ui/Tabs'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

const style = {
  height: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const date = new Date().toLocaleDateString('ru')

const mapStateToProps = (state, ownProps) => {
  return {
      users:state.users,
      masterClasses: state.masterClasses  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsers:()=> dispatch(getUsers()),
    changeRegistrationState: path=> dispatch(changeRegistrationState(path)),
    getMasterClasses:()=>dispatch(getMasterClasses())
  }
}
class Dashboard extends Comment{
  componentWillMount() {
    this.props.getUsers()
    this.props.getMasterClasses()
  }
  render(){
    return
      <Paper style={style} zDepth={1}>
        <p>Welcome to YouLead {new Date().getFullYear()} Preregistration! </p>
        <Tabs>
          <Tab label="Attendee" >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>section</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                  <TableHeaderColumn>Master class</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
              {this.props.users.map(user=>{                
                <TableRow>
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>        
                    <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    cheked={user[date]}
                    //onCheck={(e)=>this.props.changeRegistrationState($`user/${user.id}`)}
                  />
                  <TableRowColumn>{user[date]}</TableRowColumn>
                  </TableRowColumn>
                    </TableRow>
              })}              
              </TableBody>
            </Table>
          </Tab>
          <Tab label="Master Classes" >            
            <Table>
              <TableHeader>
              <TableRow>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Time period</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Is blocked</TableHeaderColumn>
              </TableRow>
              </TableHeader>
              <TableBody>
              {this.props.masterClasses.map(item=>{                
                <TableRow>
                  <TableRowColumn>{item.date}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>        
                    <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    cheked={item.isBlocked}
                    onCheck={(e)=>this.props.changeRegistrationState(`masterclasses/${date}/${item.section}/${item.time}/${item.name}`)}
                  />
                  </TableRowColumn>
                </TableRow>
              })}              
             </TableBody>
            </Table>
          </Tab>
        </Tabs>
      </Paper>
  }
} 
export default  connect(  mapStateToProps,
  mapDispatchToProps)(Dashboard)