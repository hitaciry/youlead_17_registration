import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers} from '../actions'
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
      users:!state.combineReducer.users?null:Object.values(state.combineReducer.users)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsers:async ()=> {return  getUsers().then(dispatch)}
  }
}
class UsersTable extends Component{

  componentDidMount() {
    if(!this.props.users)
      this.props.getUsers()
  }
  render(){
    return<MuiThemeProvider>
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
              {this.props.users && this.props.users.map(user=>{                
                if(user[24102017])
                  console.log(user[24102017])
                return <TableRow key={user.key}>
                  <TableRowColumn>{user.key}</TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>{user.section}</TableRowColumn>
                  <TableRowColumn>        
                    <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    disabled={true}
                    checked={user[24102017]}
                    //onCheck={(e)=>this.props.changeRegistrationState($`user/${user.id}`)}
                  />
                  </TableRowColumn>
                  <TableRowColumn>{user[24102017]&&user[24102017].filter(f=>f!==undefined).join()}</TableRowColumn>
                    </TableRow>
              })}              
              </TableBody>
            </Table>
    </MuiThemeProvider>
  }
} 
export default  connect(  mapStateToProps,
  mapDispatchToProps)(UsersTable)