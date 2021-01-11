import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./pages/Dashboard/Dashboard";
import EncodeMasterList from "./pages/EncodeMasterList/EncodeMasterList";
import Report from "./pages/Report/Report";
import DispatchControl from "./pages/DispatchControl/DispatchControl";
import MasterList from "./pages/MasterList/MasterList";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import constant from "./constant";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import NavbarTop from "./components/Navbar/NavbarTop";
import TopAlert from "./components/Alert/TopAlert";
import AuthLoading from "./components/Loading/AuthLoading";
import { I_GlobalState, I_AppProps } from "./interfaces";
import _ from "lodash";

const App = (props: I_AppProps) => {
  const { gCurrentPage } = props;

  useEffect(() => {
    document.title = `${constant.pageTitle} - ${gCurrentPage === "" ? "Loading..." : gCurrentPage}`;
  }, [gCurrentPage]);

  const renderRoutes = () => {
      return (
        <>
          <Route
            path="/"
            exact
            render={() => {
              return <AuthLoading />;
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <Login />;
            }}
          />
          <Route
            path="/dashboard"
            render={() => {
              return <Dashboard />;
            }}
          />
          <Route
            path="/masterlists"
            render={() => {
              return <MasterList />;
            }}
          />
          <Route
            path="/dispatchcontrol"
            render={() => {
              return <DispatchControl />;
            }}
          />
          <Route
            path="/encodemasterlist"
            render={() => {
              return <EncodeMasterList />;
            }}
          />
          <Route
            path="/report"
            render={() => {
              return <Report />;
            }}
          />
          <Route
            path="/settings"
            render={() => {
              return <Settings />;
            }}
          />
        </>
      );
  };
  return (
    <Router>
      <NavbarTop />
      <TopAlert />
      {renderRoutes()}
    </Router>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gCurrentPage: gState.navBar.currentPage,
});

export default connect(mapStateToProps)(App);
