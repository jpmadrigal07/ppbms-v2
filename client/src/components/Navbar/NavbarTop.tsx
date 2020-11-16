import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Navbar.scss";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { gSetCurrentPage } from "../../actions/navBarActions";
import { I_NavbarTopProps, I_GlobalState } from "../../interfaces";
import constant from "../../constant";

const NavbarTop = (props: I_NavbarTopProps) => {

  const { gSetCurrentPage, gCurrentPage } = props
  const history = useHistory();

  useEffect(() => {
    gSetCurrentPage(constant.defaultNavBar);
  }, []);

  useEffect(() => {
    let link = gCurrentPage;
    link = link.replace(/\s/g, "");
    link = link.toLowerCase();
    history.push("/" + link);
  }, [gCurrentPage]);

  const changePage = (page: String) => {
    gSetCurrentPage(page);
  };

  const constructNavBar = () => {
    return constant.navBarLinks.map((name, i) => {
      return (
        <Nav.Link
          key={i}
          onClick={() => changePage(name)}
          className={gCurrentPage === name ? "active" : ""}
        >
          {name}
        </Nav.Link>
      );
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">{constant.pageTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {constructNavBar()}
            <NavDropdown title="Ariel" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.4">
                Account Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gCurrentPage: gState.navBar.currentPage,
});

export default connect(mapStateToProps, { gSetCurrentPage })(NavbarTop);
