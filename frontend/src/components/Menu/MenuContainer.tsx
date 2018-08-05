import * as React from "react";
import { connect } from "react-redux";
import * as redux from "redux";

import * as action from "../../actions";
import { IStoreAll } from "../../interfaces";
import { MenuComponent } from "./MenuComponent";
import { IConnectedStore } from "./MenuInterfaces";

const mapStateToProps = (store: IStoreAll): IConnectedStore => ({
  token: store.auth.token,
});

class MenuContainer extends React.PureComponent<IConnectedStore> {

  constructor(props: IConnectedStore) {
    super(props);
  }

  public render() {
    return (
      <MenuComponent
        token={this.props.token}
      />
    );
  }
}

export const Menu: React.ComponentClass =
  connect(mapStateToProps)(MenuContainer);
