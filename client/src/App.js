import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Plan from "./pages/Plan/Plan";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import constant from "./constant";
import "./App.css";
import { SnackbarProvider } from 'notistack';

const App = () => {
  const [isUserLoaded, setIsUserLoaded] = useState(true);

  const renderRoutes = () => {
    if (isUserLoaded) {
      return (
        <>
          <Route
            path="/"
            exact
            render={() => {
              return <Home navbarTitle={`${constant.pageTitleShort}`} pageTitle={`${constant.pageTitleLong} - Home`} />;
            }}
          />
          <Route
            path="/about"
            render={() => {
              return <About 
              navbarTitle={`${constant.pageTitleShort} - About`} pageTitle={`${constant.pageTitleLong} - About`}
              />;
            }}
          />
          <Route
            path="/contact"
            render={() => {
              return (
                <SnackbarProvider maxSnack={3}>
              <Contact navbarTitle={`${constant.pageTitleShort} - Contact`} pageTitle={`${constant.pageTitleLong} - Contact`}/>
              </SnackbarProvider>
              )
            }}
          />
          <Route
            path="/plan"
            render={() => {
              return <Plan 
              navbarTitle={`${constant.pageTitleShort} - Plan`} pageTitle={`${constant.pageTitleLong} - Plan`}
              />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              return (
                <SnackbarProvider maxSnack={3}>
                  <Registration
                    navbarTitle={`${constant.pageTitleShort} - Register`} pageTitle={`${constant.pageTitleLong} - Register`}
                  />
                </SnackbarProvider>
              );
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <Login />;
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
export default App;
