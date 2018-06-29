import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import * as action from '../../actions'
import { Store } from '../../reducers'
import { Link } from 'react-router-dom'
import { ModalAddOrEditTask } from '../ModalAddOrEditTask/ModalAddOrEditTask'

export interface OwnProps {
  id: number,
}

interface ConnectedStore {
  task: Store.Task,
}

interface ConnectedDispatch {
  completeTask: (id: number) => void,
}

interface OwnState {
  completed: boolean,
  modalIsOpened: boolean,
}

const mapStateToProps = (store: Store.All, ownProps: OwnProps): ConnectedStore => ({
  task: store.tasks.find(task => task.id===ownProps.id)
})

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): ConnectedDispatch => ({
  completeTask: (id: number) => {
    dispatch(action.completeTask(id))
  },
})

class TaskComponent extends React.Component<ConnectedStore & ConnectedDispatch & OwnProps, OwnState> {

  constructor(props: ConnectedStore & ConnectedDispatch & OwnProps) {
    super(props)
    this.state = {
      completed: this.props.task.completed,
      modalIsOpened: false,
    }
  }

  openModal = () => {
    this.setState({
      modalIsOpened: true,
    })
  }

   closeModal = () => {
     this.setState({modalIsOpened: false});
   }

  onCompleteTask = () => {
    this.setState({
      completed: true
    })
    this.props.completeTask(this.props.id)
  }

  showTask = () => {
    if (!this.state.completed) {
      return (
        <div>
          <div onClick={this.openModal}>{this.props.task.value}</div>
          <ModalAddOrEditTask task={this.props.task} isOpen={this.state.modalIsOpened} onRequestClose={this.closeModal}/>
          <div>Time: {this.props.task.date.getHours()}:{this.props.task.date.getMinutes()}</div>
          <button onClick={this.onCompleteTask}>Complete</button>
        </div>
      )
    } else {
      return (
        <div>
          <div>{this.props.task.value}</div>
          <div>Time: {this.props.task.date.getHours()}:{this.props.task.date.getMinutes()}</div>
          <div>Completed</div>
        </div>
      )
    }
  }

  render() { return this.showTask() }
}

export const Task: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(TaskComponent)
