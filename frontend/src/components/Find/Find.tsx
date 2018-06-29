import * as React from 'react'
import * as redux from 'redux'
import { connect } from 'react-redux'

import * as action from '../../actions'
import { Store } from '../../reducers'

interface OwnProps {}

interface OwnState {}

interface ConnectedStore {}

interface ConnectedDispatch {
  findTask: (value: string) => void
}

const mapStateToProps = (store: Store.All, ownProps: OwnProps): ConnectedStore => ({})

const mapDispatchToProps = (dispatch: redux.Dispatch<action.Action>): ConnectedDispatch => ({
  findTask: (value: string) => {
    dispatch(action.findTask(value))
  },
})

class FindComponent extends React.Component<ConnectedStore & ConnectedDispatch & OwnProps, OwnState> {

  onFindTask = () => {
    this.props.findTask(this.findTaskInput.value)
  }

  findTaskInput: HTMLInputElement

  render () {
    return (
      <div>
        <input ref={(input)=>{this.findTaskInput = input}}/>
        <button onClick={this.onFindTask}>Find</button>
      </div>
    )
  }
}

export const Find: React.ComponentClass<OwnProps> =
  connect(mapStateToProps, mapDispatchToProps)(FindComponent)
