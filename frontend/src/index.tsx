import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as Redux from "redux";
import { App } from "./components/App/AppContainer";
import { Home } from "./components/Home/Home";
import { List } from "./components/List/List";
import { Menu } from "./components/Menu/Menu";
import { Overview } from "./components/Overview/Overview";
import { IStoreAll } from "./interfaces"
import { reducers } from "./reducers";

const store: Redux.Store<IStoreAll> = Redux.createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/menu" component={Menu}/>
        <Route path="/calendar" component={App}/>
        <Route path="/overview" component={Overview}/>
        <Route path="/list" component={List}/>
      </div>
    </Router>
  </Provider>
, document.getElementById("index"));
