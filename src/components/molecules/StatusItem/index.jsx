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

//#region > Constant Variables
const PROXY_URL = process.env.REACT_APP_CORS;
//#endregion

//#region > Components
class StatusItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { url: PROXY_URL + this.props.url, degradation: false };
  }

  componentDidMount() {
    this.getStatus();
    this.checkDependencies();

    // Refresh every minute
    this.interval = setInterval(() => this.getStatus(), 900000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStatus() {
    const sendDate = new Date().getTime();
    this.setState(
      {
        status: undefined,
      },
      () => {
        axios({
          url: this.state.url,
          method: "GET",
          headers: {
            "content-type": "text/plain",
          },
        })
          .then((response) => {
            const status = response.status;
            const receiveDate = new Date().getTime();

            switch (status) {
              case 200:
                this.setState({
                  status: {
                    code: status,
                    message: response.statusText,
                    data: response,
                    timeElapsed: receiveDate - sendDate,
                  },
                });
                break;
              default:
                this.setState({
                  status: {
                    code: status,
                    message: response.statusText,
                    data: response,
                    timeElapsed: receiveDate - sendDate,
                  },
                });
                break;
            }
          })
          .catch((err) => {
            const receiveDate = new Date().getTime();

            this.setState({
              status: {
                code: err.response?.status,
                message: err.response?.statusText,
                data: err.response,
                timeElapsed: receiveDate - sendDate,
              },
            });
          });
      }
    );
  }

  isRedirect = () => {
    if (this.state.status && this.state.status.data) {
      // Check if there is a final url
      if (this.state.status.data.headers["x-final-url"]) {
        // Check if the final url is the url we started with
        if (
          this.state.status.data.headers["x-final-url"] === this.props.url ||
          this.state.status.data.headers["x-final-url"].includes(
            this.props.url
              .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
              .split("/")[0]
          )
        ) {
          // User has not been redirected
          return false;
        } else {
          // User has been redirected
          return this.state.status.data.headers["x-final-url"];
        }
      } else {
        // User has (most likely) not been redirected
        return false;
      }
    } else {
      return false;
    }
  };

  checkDependencies = async () => {
    const { dependencies } = this.props;

    if (dependencies) {
      dependencies.forEach(async (url) => {
        if (!this.state.degradation) {
          await axios({
            url: PROXY_URL + url,
            method: "GET",
            headers: {
              "content-type": "text/plain",
            },
          })
            .then((response) => {
              const status = response.status;

              if (status === 200) {
                this.setState({
                  degradation: false,
                });
              } else {
                this.setState({
                  degradation: true,
                });
              }
            })
            .catch(() => {
              this.setState({
                degradation: true,
              });
            });
        }
      });
    }
  };

  render() {
    const isRedirect = this.isRedirect();

    return (
      <MDBListGroupItem
        className={
          this.state.status?.code
            ? "status-" +
              this.state.status.code +
              " d-flex justify-content-between"
            : "loading d-flex justify-content-between"
        }
      >
        <div>
          <span>
            <span
              className={
                this.state.status?.code !== 200 ? "text-muted" : undefined
              }
            >
              <img
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${this.props.url}`}
                alt={this.props.url + " Favicon"}
                className="mr-2"
              />
              <a
                href={this.props.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.url}
              </a>
            </span>
            <span className="d-block small text-muted text-left">
              {isRedirect && (
                <span>
                  <MDBIcon icon="angle-right" className="mx-2 blue-text" />
                  {isRedirect}
                </span>
              )}
            </span>
          </span>
          {this.state.status && this.state.status.data && (
            <code className="mr-2 d-block">
              {this.state.status?.data.headers.server === "cloudflare" && (
                <MDBIcon icon="cloud" className="orange-text mr-2" />
              )}
              {this.state.status.timeElapsed} ms{" "}
              <span className="text-muted">elapsed</span>
            </code>
          )}
          {this.props.dependencies.length > 0 && (
            <span className="mt-1 d-block small text-muted text-left">
              {this.props.dependencies.length}{" "}
              {this.props.dependencies.length === 1
                ? "dependency"
                : "dependencies"}
            </span>
          )}
        </div>
        <div className="text-right">
          {this.state.status ? (
            <>
              {this.state.status.code === 200 ? (
                <>
                  {this.state.degradation ? (
                    <>
                      <span className="text-warning">
                        Limited functionality
                        <MDBIcon className="ml-1" icon="question-circle" />
                      </span>
                      <span className="text-muted small d-block">
                        {this.state.status.code} - {this.state.status.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-success">
                        Running
                        <MDBIcon className="ml-1" icon="check-circle" />
                      </span>
                      <span className="text-muted small d-block">
                        {this.state.status.code} - {this.state.status.message}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {isRedirect ? (
                    <>
                      <span className="text-danger">
                        Not available
                        <MDBIcon className="ml-1" icon="times-circle" />
                      </span>
                      <span className="text-muted small d-block">
                        <MDBIcon className="ml-1" icon="plane" />{" "}
                        {this.state.status.code} - {this.state.status.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-danger">
                        Not available
                        <MDBIcon className="ml-1" icon="times-circle" />
                      </span>
                      <span className="text-muted small d-block">
                        {this.state.status.code} - {this.state.status.message}
                      </span>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="text-right">
              <span className="blue-text">
                <MDBIcon className="ml-1" icon="redo-alt" spin />
              </span>
              <span className="text-muted small d-block">Loading</span>
            </div>
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
