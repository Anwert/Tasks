import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import * as action from '../../actions'
import { Store } from '../../reducers'
import { Menu } from '../Menu/Menu'

interface OwnProps {}

interface OwnState {}

interface ConnectedStore {
  tasks: Store.Tasks
}

interface ConnectedDispatch {
  filterTasksByMonth: (month: number) => void
}

const mapStateToProps = (store: Store.All, ownProps: OwnProps): ConnectedStore => ({
  tasks: store.tasks.filter(task => task.date.getUTCMonth() === store.filterTasksByMonth)
})

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): ConnectedDispatch => ({
  filterTasksByMonth: (month: number) => {
    dispatch(action.filterTasksByMonth(month))
  },
})

class OverviewComponent extends React.Component<ConnectedStore & ConnectedDispatch & OwnProps, OwnState> {

  constructor(props: ConnectedStore & ConnectedDispatch & OwnProps) {
    super(props)
  }

  chooseMonth = (month: number) => {
    this.props.filterTasksByMonth(month)
  }

  showCompleted = () => {
    let allTasks = this.props.tasks.length
    let completedTasks = this.props.tasks.filter(task => task.completed === true).length
    if (allTasks > 0) return `${completedTasks} ${(completedTasks*100/allTasks).toFixed(1)}%`
    else return `0 0%`
  }

  showOverdue = () => {
    let allTasks = this.props.tasks.length
    let overdueTasks = this.props.tasks.filter(task => task.completed === false).filter(task => task.date < new Date()).length
    if (allTasks > 0) return `${overdueTasks} ${(overdueTasks*100/allTasks).toFixed(1)}%`
    else return `0 0%`
  }

  render () {
    return (
      <div>
        <Menu/>
        <div>Overview</div>
        <button onClick={()=>this.chooseMonth(0)}>January</button>
        <button onClick={()=>this.chooseMonth(1)}>February</button>
        <button onClick={()=>this.chooseMonth(2)}>March</button>
        <button onClick={()=>this.chooseMonth(3)}>April</button>
        <button onClick={()=>this.chooseMonth(4)}>May</button>
        <button onClick={()=>this.chooseMonth(5)}>June</button>
        <button onClick={()=>this.chooseMonth(6)}>July</button>
        <button onClick={()=>this.chooseMonth(7)}>August</button>
        <button onClick={()=>this.chooseMonth(8)}>September</button>
        <button onClick={()=>this.chooseMonth(9)}>October</button>
        <button onClick={()=>this.chooseMonth(10)}>November</button>
        <button onClick={()=>this.chooseMonth(11)}>December</button>
        <div>{this.props.tasks.length}</div>
        <div>Total</div>
        <div>Completed {this.showCompleted()}</div>
        <div>Overdue {this.showOverdue()}</div>
      </div>
    )
  }
}

export const Overview: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(OverviewComponent)
