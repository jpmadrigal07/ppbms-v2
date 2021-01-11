import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Navbar.scss";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { gSetCurrentPage } from "../../actions/navBarActions";
import { I_NavbarTopProps, I_GlobalState } from "../../interfaces";
import { triggerTopAlert } from "../../actions/topAlertActions";
import constant from "../../constant";
import _ from "lodash";

const NavbarTop = (props: I_NavbarTopProps) => {
  const { gSetCurrentPage, gCurrentPage, gAuthData, gAuthIsLoading, triggerTopAlert, isTopAlertVisible } = props;
  const history = useHistory();

  useEffect(() => {
    let link = gCurrentPage;
    link = link.replace(/\s/g, "");
    link = link.toLowerCase();
    history.push("/" + link);
  }, [gCurrentPage]);

  const changePage = (page: string) => {
    if(isTopAlertVisible) {
      triggerTopAlert(false, "", "")
    }
    gSetCurrentPage(page);
  };

  const constructNavBar = () => {
    if(gAuthData && gAuthData !== "" && !gAuthIsLoading && gCurrentPage !== "Login" && gCurrentPage !== "") { 
      return constant.navBarLinks.map((name, i, arr) => {
        if (arr.length - 1 === i) {
          // last one
          return (
            <>
              <Nav.Link
                onClick={() => changePage(name)}
                className={gCurrentPage === name ? "active" : ""}
              >
                {name}
              </Nav.Link>
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/api/logout">Log out</NavDropdown.Item>
              </NavDropdown>
            </>
          );
        } else {
          // not last one
          return (
            <Nav.Link
              key={i}
              onClick={() => changePage(name)}
              className={gCurrentPage === name ? "active" : ""}
            >
              {name}
            </Nav.Link>
          );
        }
      });
    } else {
      return null;
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{marginBottom: '35px'}}>
      <Container>
        <Navbar.Brand href="#home">{constant.pageTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {constructNavBar()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gCurrentPage: gState.navBar.currentPage,
  gAuthIsLoading: gState.auth.isLoading,
  gAuthData: gState.auth.user,
  isTopAlertVisible: gState.topAlert.showAlert
});

export default connect(mapStateToProps, { gSetCurrentPage, triggerTopAlert })(NavbarTop);
