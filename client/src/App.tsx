import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./pages/Dashboard/Dashboard";
import EncodeMasterList from "./pages/EncodeMasterList/EncodeMasterList";
import Report from "./pages/Report/Report";
import DispatchControl from "./pages/DispatchControl/DispatchControl";
import MasterList from "./pages/MasterList/MasterList";
import Login from "./pages/Login/Login";
import constant from "./constant";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import NavbarTop from "./components/Navbar/NavbarTop";
import { I_GlobalState, I_AppProps } from "./interfaces";

const App = (props: I_AppProps) => {

  const { gCurrentPage } = props;
  const [isUserLoaded, setIsUserLoaded] = useState(true);

  useEffect(() => {
    document.title = `${constant.pageTitle} - ${gCurrentPage}`;
  }, [gCurrentPage]);

  const renderRoutes = () => {
    if (isUserLoaded) {
      return (
        <>
          <NavbarTop />
          <Route
            path="/"
            exact
            render={() => {
              return (
                  <Login />
              );
            }}
          />
          <Route
            path="/dashboard"
            render={() => {
              return (
                <Dashboard />
              );
            }}
          />
          <Route
            path="/masterlists"
            render={() => {
              return (
                <MasterList />
              );
            }}
          />
          <Route
            path="/dispatchcontrol"
            render={() => {
              return (
                <DispatchControl />
              );
            }}
          />
          <Route
            path="/encodemasterlist"
            render={() => {
              return (
                <EncodeMasterList />
              );
            }}
          />
          <Route
            path="/report"
            render={() => {
              return (
                <Report />
              );
            }}
          />
        </>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  };
  return <Router>{renderRoutes()}</Router>;
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gCurrentPage: gState.navBar.currentPage,
});

export default connect(mapStateToProps)(App);
