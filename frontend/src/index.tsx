import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import * as Redux from "redux";
import thunk from "redux-thunk";

import { fetchTasks } from "./actions";
import { Logout } from "./components/Auth/Logout/Logout";
import { SignIn } from "./components/Auth/SignIn/SignInContainer";
import { SignUp } from "./components/Auth/SignUp/SignUpContainer";
import { Calendar } from "./components/Calendar/CalendarContainer";
import { Home } from "./components/Home/HomeContainer";
import { List } from "./components/List/ListContainer";
import { Menu } from "./components/Menu/MenuContainer";
import { Overview } from "./components/Overview/OverviewContainer";
import { IStoreAll } from "./interfaces";
import { reducers } from "./reducers";

const store: Redux.Store<IStoreAll> = Redux.createStore(reducers, Redux.applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/signin" component={SignIn}/>
        <Route exact={true} path="/signup" component={SignUp}/>
        <Route exact={true} path="/home" component={Home}/>
        <Route exact={true} path="/menu" component={Menu}/>
        <Route exact={true} path="/calendar" component={Calendar}/>
        <Route exact={true} path="/overview" component={Overview}/>
        <Route exact={true} path="/list" component={List}/>
        <Route exact={true} path="/logout" component={Logout}/>
        <Route path="/*" render={() => (<Redirect to="/signin" />)}/>
      </Switch>
    </Router>
  </Provider>
, document.getElementById("index"));
