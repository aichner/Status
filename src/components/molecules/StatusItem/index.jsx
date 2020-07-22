//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBListGroupItem, MDBIcon } from "mdbreact";

//> Additional
// Fetch but better
import axios from "axios";
//#endregion

//#region > URLS
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
////#endregion

//#region > Components
class StatusItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: this.props.url };
  }

  componentDidMount() {
    this.getStatus();
  }

  getStatus() {
    axios.get(PROXY_URL + this.state.url).then((response) => {
      const status = response.status;

      switch (status) {
        case 200:
          this.setState({
            status: { code: status, message: "online" },
          });
          break;
        default:
          this.setState({
            status: { code: status, message: response.statusText },
          });
          break;
      }
    });
  }

  render() {
    return (
      <MDBListGroupItem className="d-flex justify-content-between">
        <div>{this.state.url}</div>

        <div>
          {this.state.status && (
            <>
              {this.state.status.code === 200 ? (
                <span className="text-success">
                  {this.state.status.message}
                  <MDBIcon className="ml-1" icon="check-circle" />
                </span>
              ) : (
                <span className="text-success">
                  {this.state.status.message}
                  <MDBIcon className="ml-1" icon="times-circle" />"
                </span>
              )}
            </>
          )}
        </div>
      </MDBListGroupItem>
    );
  }
}
//#endregion

//#region > Exports
export default StatusItem;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
