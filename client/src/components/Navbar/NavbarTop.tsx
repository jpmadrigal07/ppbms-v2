import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Navbar.scss";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { gSetCurrentPage } from "../../actions/navBarActions";
import { I_NavbarTopProps, I_GlobalState } from "../../interfaces";
import { triggerTopAlert } from "../../actions/topAlertActions";
import { pageTitle, navBarLinks, defaultPageWhenLoggedIn, defaultPageWhenLoggedOut } from "../../constant";
import { gFetchUser } from "../../actions/authActions";
import _ from "lodash";

const NavbarTop = (props: I_NavbarTopProps) => {
  const {
    gSetCurrentPage,
    gCurrentPage,
    gAuthData,
    gAuthIsLoading,
    triggerTopAlert,
    isTopAlertVisible,
    gFetchUser,
  } = props;
  const history = useHistory();

  useEffect(() => {
    const activePath = window.location.pathname;
    if (activePath !== "/") {
      const currentPage = activePath.replace(/\//g, "");
      const page = navBarLinks.find((res) => {
        const foundPage = res.linkName;
        return currentPage === foundPage;
      });
      const pagesLinkTitle = navBarLinks.map((res: any) => {
        return !res.isVisible ? res.linkTitle : null;
      })
      if (!_.isNil(page) && !pagesLinkTitle.includes(page.linkTitle)) {
        changePage(page.linkTitle);
      }
    }
    if (_.isNil(gAuthData)) {
      gFetchUser();
    }
  }, []);

  useEffect(() => {
    if(!_.isNil(gAuthData)) {
      if (!gAuthIsLoading && _.isNil(gAuthData!.role)) {
        changePage(defaultPageWhenLoggedOut)
      } else if (!gAuthIsLoading && !_.isNil(gAuthData!.role)) {
        const activePath = window.location.pathname;
        if (activePath === "/" || gCurrentPage === "") {
          const currentPageName = activePath.replace(/\//g, "");
          const pagesLowerCase = navBarLinks.map((res: any) => {
            return !res.isVisible ? res.linkName : null;
          })
          const currentPageLinkTitle = navBarLinks.find((res: any) => res.linkName === currentPageName)?.linkTitle
          if(!pagesLowerCase.includes(currentPageName)) {
            changePage(defaultPageWhenLoggedIn)
          } else {
            gSetCurrentPage(currentPageLinkTitle)
          }
        }
      }
    }
  }, [gAuthData]);

  const changePage = (page: string) => {
    if (isTopAlertVisible) {
      triggerTopAlert(false, "", "");
    }
    gSetCurrentPage(page);
    let link = page;
    link = link.replace(/\s/g, "");
    link = link.toLowerCase();
    history.push("/" + link);
  };

  const constructNavBar = () => {
    if (
      gAuthData &&
      gAuthData !== "" &&
      !gAuthIsLoading &&
      gCurrentPage !== defaultPageWhenLoggedOut
    ) {
      return navBarLinks.filter((res) => res.isVisible).map((res, i, arr) => {
        if (arr.length - 1 === i) {
          // last one
          return (
            <>
              <Nav.Link
                onClick={() => changePage(res.linkTitle)}
                className={gCurrentPage === res.linkTitle ? "active" : ""}
              >
                {res.linkTitle}
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
              onClick={() => changePage(res.linkTitle)}
              className={gCurrentPage === res.linkTitle ? "active" : ""}
            >
              {res.linkTitle}
            </Nav.Link>
          );
        }
      });
    } else {
      return null;
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "35px" }}
    >
      <Container>
        <Navbar.Brand href="#home">{pageTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">{constructNavBar()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gCurrentPage: gState.navBar.currentPage,
  gAuthIsLoading: gState.auth.isLoading,
  gAuthData: gState.auth.user,
  isTopAlertVisible: gState.topAlert.showAlert,
});

export default connect(mapStateToProps, {
  gSetCurrentPage,
  triggerTopAlert,
  gFetchUser,
})(NavbarTop);
