import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers} from '../actions'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import FlatButton from 'material-ui/FlatButton'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'

const date = new Date().toLocaleDateString('ru').split('.').join('')

const mapStateToProps = (state, ownProps) => {
   return {
      users:!state.combineReducer.users?null:Object.values(state.combineReducer.users).filter(f=>f.name!=='  ')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsers:async ()=> {return  getUsers().then(u=>{dispatch(u);return u.users})}
  }
}
class UsersTable extends Component{
  constructor(props){
    super(props)
    this.state={
      page:0,
      load:!props.users,
      users:props.users,
      selectedUser:null
    }
  }
  componentDidMount() {
    if(!this.props.users)
    {
      this.setState({load:true})
      this.props.getUsers().then(u=>{this.setState({users:Object.values(u).filter(f=>f.name!=='  '),load:false})})
    }
  }
  render(){
    const selectedUser = this.state.selectedUser
    const start =   this.state.page*100
    const end= this.state.users&&(this.state.page+1)*100>this.state.users.length?this.state.users.length:(this.state.page+1)*100
    const users =this.state.users&&this.state.users.slice(start, end )
    return<div>
            {this.state.load?<CircularProgress size={80} thickness={5} style={{ display:'flex', justifyContent:'center', width:350,   margin:'auto' }}/>
              :<Table fixedHeader={true} fixedFooter={true} height={'400pt'} displaySelectAll={false} onCellClick={(r,c)=>{this.setState({selectedUser:users[r]})}}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn><TextField hintText={'Name'} onChange={(e,v)=>v.length>=3?this.setState({page:0,users:this.props.users.filter(f=>f.name&&f.name.toLowerCase().includes(v.toLowerCase()))}):this.props.users!==this.state.users&&this.setState({users:this.props.users})} /></TableHeaderColumn>
                    <TableHeaderColumn>section</TableHeaderColumn>
                    <TableHeaderColumn>Status ({this.state.users&&`${this.state.users.length}/${this.state.users.filter(f=>f[date]).length}`}) <Checkbox onCheck={(e,c)=>c?this.setState({page:0,users:this.props.users.filter(f=>f[date])}):this.props.users!==this.state.users&&this.setState({users:this.props.users})} label={'select checked only'}/></TableHeaderColumn>
                    <TableHeaderColumn>Master class</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
              {users.map(user=>{                
                return <TableRow   key={user.key}>
                  <TableRowColumn >{user.key}</TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>{user.section}</TableRowColumn>
                  <TableRowColumn>        
                    <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    disabled={true}
                    checked={user[date]}
                    //onCheck={(e)=>this.props.changeRegistrationState($`user/${user.id}`)}
                  />
                  </TableRowColumn>
                  <TableRowColumn>{user[date]&&Object.values( user[date]).filter(f=>f!==undefined).join()}</TableRowColumn>
                    </TableRow>
              })
            }      
            </TableBody>     
            </Table>}
            <FlatButton primary={true} label={`<`} onClick={(e)=>{this.setState({page:this.state.page-1})}} disabled={this.state.page===0} />
            <label>{`from ${start} to ${end}`}</label>
            <FlatButton primary={true} label='>' onClick={(e)=>{this.setState({page:this.state.page+1})}} disabled={!this.state.users||(this.state.page+1)*100>this.state.users.length}/>
      {selectedUser&&<Dialog
        title={selectedUser.name}
        open={true}
        autoScrollBodyContent={true}
        actions={<FlatButton label='Close' onClick={(e)=>this.setState({selectedUser:null})}/>}  
        >
        <List>
        {Object.keys(selectedUser).map((key)=>
          <ListItem primaryText={key} secondaryText={String(selectedUser[key])} />
        )}
        </List>
        </Dialog>}
    </div>
  }
} 
export default  connect(  mapStateToProps,
  mapDispatchToProps)(UsersTable)