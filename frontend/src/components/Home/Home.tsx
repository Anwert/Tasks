import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../actions'
import { Store } from '../../reducers'
import { Task } from '../Task/Task'
import { ModalAddOrEditTask } from '../ModalAddOrEditTask/ModalAddOrEditTask'

interface OwnProps {}

interface OwnState {
  date: Date
}

interface ConnectedState {
  tasks: Store.Tasks
}

interface ConnectedDispatch {}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
  tasks: state.tasks
})

const mapDispatchToProps = (dispatch: redux.Dispatch<actions.Action>): ConnectedDispatch => ({})

class HomeComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

  constructor(props: ConnectedState & ConnectedDispatch & OwnProps) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  showDay = () => {
    switch(this.state.date.getUTCDay()) {
      case 0:
        return "Monday"
      case 1:
        return "Tuesday"
      case 2:
        return "Wednesday"
      case 3:
        return "Thursday"
      case 4:
        return "Friday"
      case 5:
        return "Saturday"
      case 6:
        return "Sunday"
    }
  }

  showDate = () => {
      switch(this.state.date.getUTCMonth()) {
        case 0:
          return (`January ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 1:
          return (`February ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 2:
          return (`March ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 3:
          return (`April ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 4:
          return (`May ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 5:
          return (`June ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 6:
          return (`July ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 7:
          return (`August ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 8:
          return (`September ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 9:
          return (`October ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 10:
          return (`November ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
        case 11:
          return (`December ${this.state.date.getUTCDate()}, ${this.state.date.getUTCFullYear()}`)
      }
  }

  showTasks = () => {
    if (this.props.tasks.filter(task => task.date.getDate() === this.state.date.getDate()).length > 0) {
      return (<div>Tasks for today:</div>)
    } else {
      return (<div>No tasks for today</div>)
    }
  }

  render () {
    return (
      <div>
        <Link to='/menu'>Menu</Link>
        <div>Hello!</div>
        <div>{this.showDay()}</div>
        <div>{this.showDate()}</div>
        <ul>
        {this.showTasks()}
          { this.props.tasks.map((item) => {
              if (item.date.getDate() === this.state.date.getDate())
                return (
                  <li key={item.id}>
                    <Task id={item.id}/>
                  </li>
                )})}
        </ul>
    </div>)}}

export const Home: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
