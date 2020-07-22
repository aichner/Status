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
  MDBBtn,
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

//> Images
// Logo of Advertisement Agency Christian Aichner
import { ReactComponent as Logo } from "../../../assets/logo.svg";
//#endregion

//#region > Data
const groups = [
  {
    name: "Pharmaziegasse 5 Kosmetik GmbH",
    urls: [
      {
        url: "https://www.pharmaziegasse.at",
        dependencies: ["https://www.aichnerc.at"],
      },
      { url: "https://charm.pharmaziegasse.at", dependencies: [] },
    ],
  },
  {
    name: "SNEK - Social Network for Engineers",
    urls: [
      { url: "https://snek.at", dependencies: ["https://engine.snek.at"] },
      { url: "https://engine.snek.at", dependencies: [] },
    ],
  },
  {
    name: "Black Wolf Coffee / Blue Lupi",
    urls: [
      {
        url: "https://www.kaffeerudel.at",
        dependencies: ["https://lupi.aichner.cloud"],
      },
      { url: "https://bluelupi.at", dependencies: [] },
      { url: "https://nocoffee.at", dependencies: [] },
      { url: "https://lupi.aichner.cloud", dependencies: [] },
    ],
  },
  {
    name: "Sonnenarm",
    urls: [{ url: "https://www.sonnenarm.at", dependencies: [] }],
  },
  {
    name: "Aichner Cloud",
    urls: [
      { url: "https://www.aichner-christian.com", dependencies: [] },
      { url: "https://www.aichnerc.at", dependencies: [] },
      { url: "https://www.kisy.at", dependencies: [] },
      { url: "https://www.aichner.industries", dependencies: [] },
    ],
  },
  {
    name: "SithCult",
    urls: [{ url: "https://www.sithcult.com", dependencies: [] }],
  },
  {
    name: "Marstime",
    urls: [{ url: "https://www.marstime.org", dependencies: [] }],
  },
  {
    name: "Kojin",
    urls: [{ url: "https://www.kojin.at", dependencies: [] }],
  },
  {
    name: "Gutschein2Go",
    urls: [
      {
        url: "https://www.gutschein2go.at",
        dependencies: ["https://www.g2g.at"],
      },
      {
        url: "https://www.g2g.at",
        dependencies: ["https://www.gutschein2go.at"],
      },
    ],
  },
  {
    name: "Naturvertrieb",
    urls: [{ url: "https://www.naturvertrieb.at", dependencies: [] }],
  },
];
//#endregion

//#region > Components
class HomePage extends React.Component {
  render() {
    return (
      <MDBContainer className="py-5">
        <div className="text-center">
          <div className="mb-4">
            <Logo id="logo" />
          </div>
          <div className="text-center main-content">
            <MDBIcon icon="cloud" size="2x" />
            <h2 className="font-weight-bold mb-0">
              aichner<span>.cloud</span>
            </h2>
          </div>
          <div className="text-muted mb-2">
            Web Services built and provided by us.
          </div>
          <div>
            <a
              href="https://www.github.com/aichner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MDBBtn color="elegant">
                <MDBIcon fab icon="github" className="pr-1" /> Github
              </MDBBtn>
            </a>
            <a href="https://www.aichner-christian.com/">
              <MDBBtn color="danger">Homepage</MDBBtn>
            </a>
          </div>
        </div>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol lg="8">
            <MDBListGroup className="mt-5">
              {groups.map((group, g) => {
                return (
                  <>
                    <p className="font-weight-bold mb-0 mt-3">{group.name}</p>
                    {group.urls.map((url, u) => {
                      return (
                        <StatusItem
                          key={u}
                          url={url.url}
                          dependencies={url.dependencies}
                        />
                      );
                    })}
                  </>
                );
              })}
            </MDBListGroup>
          </MDBCol>
        </MDBRow>
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
