import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as action from '../../actions'
import { Store } from '../../reducers'
import { Task } from '../Task/Task'
import { ModalAddOrEditTask } from '../ModalAddOrEditTask/ModalAddOrEditTask'
import { Find } from '../Find/Find'

interface OwnProps {}

interface OwnState {
  date: Date
}

interface ConnectedStore {
  tasks: Store.Tasks
}

interface ConnectedDispatch {}

const mapStateToProps = (store: Store.All, ownProps: OwnProps): ConnectedStore => ({
  tasks: store.tasks.filter(task => task.value.includes(store.filterTasks))
})

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): ConnectedDispatch => ({})

class ListComponent extends React.Component<ConnectedStore & ConnectedDispatch & OwnProps, OwnState> {

  constructor(props: ConnectedStore & ConnectedDispatch & OwnProps) {
    super(props)
    this.state = {
      date: new Date()
    }}

  render () {
    return (
      <div>
        <Link to='/menu'>Menu</Link>
        <Find />
        {/* <ModalAddOrEditTask task={null}/> */}
        <ul>
          { this.props.tasks.map((item) => (
            <li key={item.id}>
              <Task id={item.id}/>
            </li>
          ))}
        </ul>
    </div>
  )}
}

export const List: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(ListComponent)
