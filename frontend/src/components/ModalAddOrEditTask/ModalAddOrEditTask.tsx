import * as React from 'react'
import * as ReactModal from 'react-modal'
import * as redux from 'redux'
import { connect } from 'react-redux'

import { Store } from '../../reducers'
import * as action from '../../actions'
import Calendar from 'react-calendar'
// import Calendar from 'react-calendar/dist/entry.nostyl'

type OwnProps = { task?: Store.Task, isOpen: boolean, onRequestClose: () => void }

interface OwnState {
  dateInputError: boolean,
  date: Date,
}

interface ConnectedStore {}

interface ConnectedDispatch {
  addTask: (task: Store.Task) => void,
  deleteTask: (id: number) => void,
  editTask: (task: Store.Task) => void,
}

const mapStateToProps = (store: Store.All, ownProps: OwnProps): ConnectedStore => ({})

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): ConnectedDispatch => ({
  addTask: (task: Store.Task) => {
    dispatch(action.addTask(task))
  },
  deleteTask: (id: number) => {
    dispatch(action.deleteTask(id))
  },
  editTask: (task: Store.Task) => {
    dispatch(action.editTask(task))
  },
})

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

ReactModal.setAppElement('#index')

class ModalAddOrEditTaskComponent extends React.Component<ConnectedStore & ConnectedDispatch & OwnProps, OwnState> {

  constructor(props: ConnectedStore & ConnectedDispatch & OwnProps) {
    super(props)

    this.state = {
     dateInputError: false,
     date: props.task ? props.task.date : new Date()
    }
  }

 showError = () => {
   if(this.state.dateInputError) {
     return(
       <div>Error!</div>
     )
   }
 }

  onAddOrEditTask = () => {
      if (+this.taskHoursInput.value > 59
        || +this.taskHoursInput.value < 0
        || +this.taskMinutesInput.value > 59
        || +this.taskMinutesInput.value < 0
        || isNaN(+this.taskHoursInput.value)
        || isNaN(+this.taskMinutesInput.value)
      ) {
        this.setState({dateInputError: true})
      } else {
        this.task = {
          value: this.taskInput.value,
          date: new Date(
            this.state.date.getFullYear(),
            this.state.date.getMonth(),
            this.state.date.getDate(),
            +this.taskHoursInput.value,
            +this.taskMinutesInput.value,
          ),
          completed: false,
        }
        this.setState({dateInputError: false})
        this.props.onRequestClose()
        if (this.props.task) {
          this.task = { id:this.props.task.id, ...this.task}
          this.props.editTask(this.task)
        } else {
          this.props.addTask(this.task)
        }
      }
    }

  task: Store.Task
  taskInput: HTMLInputElement
  taskHoursInput: HTMLInputElement
  taskMinutesInput: HTMLInputElement

  onDeleteTask = () => {
    this.props.onRequestClose()
    this.props.deleteTask(this.props.task.id)
  }

  showTime = () => {
    return (
      <div>
        <div>Enter time:</div>
        <input ref={(input)=>{this.taskHoursInput = input}} placeholder={this.state.date.getHours().toString()}/>
        <div> : </div>
        <input ref={(input)=>{this.taskMinutesInput = input}} placeholder={this.state.date.getMinutes().toString()}/>
      </div>
    )
  }

  showForm = () => {
    if (!this.props.task) {
      return (
        <div>
          <input type="text" ref={(input)=>{this.taskInput = input}} placeholder="Enter your task here..."/>
          { this.showTime() }
        </div>
      )
    } else return (
      <div>
        <input type="text" ref={(input)=>{this.taskInput = input}} defaultValue={this.props.task.value}/>
        { this.showTime() }
      </div>
    )
  }

  onClickDay = (date:Date) => {
    this.setState({
      date: date
    })}

  showButton = () => {
    if (this.props.task) return (
        <div>
          <button onClick={this.onAddOrEditTask}>Edit</button>
          <button onClick={this.onDeleteTask}>Delete</button>
        </div>
      )
    else return  <button onClick={this.onAddOrEditTask}>Add</button>
  }

  render() {
    return (
        <ReactModal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          style={customStyles}
        >
          { this.showError() }
          <Calendar
            onClickDay={this.onClickDay}
            locale = "en"
            activeStartDate ={this.state.date}
          />
          { this.showForm() }
          { this.showButton() }
          <button onClick={this.props.onRequestClose}>Close</button>
        </ReactModal>
    );
  }
}

export const ModalAddOrEditTask: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(ModalAddOrEditTaskComponent)
