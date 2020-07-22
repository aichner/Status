//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBListGroup,
} from "mdbreact";

//> Images
// Logo of MDB React
import MDBLogo from "../../../assets/mdb-react-small.png";
// Logo of Advertisement Agency Christian Aichner
import AgencyLogo from "../../../assets/agency-small.png";
// Image of someone coding
import Projects from "../../../assets/content/projects.jpg";

//> CSS
import "./HomePage.scss";

//> Components
import StatusItem from "../../molecules/StatusItem";
//#endregion

//#region > Data
const websites = [
  "https://www.aichner-christian.com",
  "https://engine.snek.at",
  "https://aichner.cloud",
  "https://lupi.aichner.cloud",
  "https://kaffeerudel.at",
  "https://sonnenarm.at",
];
//#endregion

//#region > Components
class HomePage extends React.Component {
  render() {
    return (
      <MDBContainer>
        <MDBListGroup>
          {websites.map((website, i) => {
            console.log(website);
            return <StatusItem key={i} url={website} />;
          })}
        </MDBListGroup>
      </MDBContainer>
    );
  }
}
//#endregion

//#region > Exports
export default HomePage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
