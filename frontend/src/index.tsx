import * as ReactDOM from 'react-dom'
import * as Redux from 'redux'
import { Provider } from 'react-redux'
import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { reducers, Store } from './reducers'
import { App } from './components/App/App'
import { Home } from './components/Home/Home'
import { Menu } from './components/Menu/Menu'
import { Overview } from './components/Overview/Overview'
import { List } from './components/List/List'

let store: Redux.Store<Store.All> = Redux.createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/menu" component={Menu}/>
        <Route path="/app" component={App}/>
        <Route path="/overview" component={Overview}/>
        <Route path="/list" component={List}/>
      </div>
    </Router>
  </Provider>
, document.getElementById('index'))
