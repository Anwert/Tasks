import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as action from '../../actions'
import { Store } from '../../reducers'
import { Task } from '../Task/Task'
import { ModalAddOrEditTask } from '../ModalAddOrEditTask/ModalAddOrEditTask'
import Calendar from 'react-calendar'
// import Calendar from 'react-calendar/dist/entry.nostyl'
import { Find } from '../Find/Find'

interface OwnProps {}

interface OwnState {
  date: Date,
  modalIsOpened: boolean,
}

interface ConnectedStore {
  tasks: Store.Tasks
}

interface ConnectedDispatch {}

const mapStateToProps = (store: Store.All, ownProps: OwnProps): ConnectedStore => ({
  tasks: store.tasks.filter(task => task.value.includes(store.filterTasks))
})

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): ConnectedDispatch => ({})

class AppComponent extends React.Component<ConnectedStore & ConnectedDispatch & OwnProps, OwnState> {

  constructor(props: ConnectedStore & ConnectedDispatch & OwnProps) {
    super(props)
    this.state = {
      date: new Date(),
      modalIsOpened: false,
    }}

  onClickDay = (date:Date) => {
    this.setState({
      date: date
    })}

  openModal = () => {
    this.setState({
      modalIsOpened: true,
    })
  }

  closeModal = () => {
    this.setState({modalIsOpened: false});
  }

  render () {
    return (
      <div>
        <Link to='/menu'>Menu</Link>
        <Find />
        <Calendar
          onClickDay={this.onClickDay}
          locale = "en"
        />
        <ul>
          { this.props.tasks.map((item) => {
              if ( item.date.getFullYear() === this.state.date.getFullYear()
                && item.date.getUTCMonth() === this.state.date.getUTCMonth()
                && item.date.getDate() === this.state.date.getDate()
              ) return (
                <li key={item.id}>
                  <Task id={item.id}/>
                </li>
              )})}
        </ul>
        <button onClick={this.openModal}>Add</button>
        <ModalAddOrEditTask isOpen={this.state.modalIsOpened} onRequestClose={this.closeModal}/>
    </div> )
  }
}

export const App: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(AppComponent)
