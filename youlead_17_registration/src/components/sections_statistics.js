import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSectionStatistics} from '../actions'
import CircularProgress from 'material-ui/CircularProgress'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const date = new Date().toLocaleDateString('ru').split('.').join('')

const mapStateToProps = (state, ownProps) => {
   return {
    section_stat:state.combineReducer.section_stat
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSectionStatistics:async ()=> {return getSectionStatistics().then(u=>{dispatch(u);return u.section_stat})}
  }
}
class SectionStatisticsTable extends Component{
  constructor(props){
    super(props)
    this.state={
      load:!props.section_stat,
      section_stat:props.section_stat
    }
  }
  componentDidMount() {
    if(!this.props.section_stat)
    {
      this.setState({load:true})
      this.props.getSectionStatistics().then(u=>{this.setState({section_stat:u,load:false})})
    }
  }
  render(){
    return<div>
            {this.state.load?<CircularProgress size={80} thickness={5} style={{ display:'flex', justifyContent:'center', width:350,   margin:'auto' }}/>
              :<Table fixedHeader={true} fixedFooter={true} height={'400pt'} displayRowCheckbox={false}>>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn>Attendee</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
              {Object.keys( this.state.section_stat).map(key=>{
                return <TableRow key={key}>
                  <TableRowColumn>{key}</TableRowColumn>
                  <TableRowColumn>{ this.state.section_stat[key]}</TableRowColumn>
                    </TableRow>
              })
            }      
            </TableBody>     
            </Table>}
          </div>
  }
} 
export default  connect(  mapStateToProps,
  mapDispatchToProps)(SectionStatisticsTable)