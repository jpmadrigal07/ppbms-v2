import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Spinner } from "react-bootstrap";
import { gSetCurrentPage } from "../../actions/navBarActions";
import { I_AuthLoadingProps, I_GlobalState } from "../../interfaces";
import { gFetchUser } from "../../actions/authActions";
import _ from "lodash";

const AuthLoading = (props: I_AuthLoadingProps) => {
  const { gSetCurrentPage, gAuthData, gFetchUser, gAuthIsLoading } = props;
  const [authLoadingCountLoads, setAuthLoadingCountLoad] = useState(0);

  useEffect(() => {
    gFetchUser();
  }, []);

  useEffect(() => {
    // avoids flickering of login page if logged in
    setAuthLoadingCountLoad(authLoadingCountLoads + 1);
    if (authLoadingCountLoads > 0) {
      if (
        !_.isNil(gAuthData) &&
        !_.isNil(gAuthData.role) &&
        gAuthData.role === "Admin"
      ) {
        gSetCurrentPage("Dashboard");
      } else {
        if(!gAuthIsLoading) {
            gSetCurrentPage("Login");
        }
      }
    }
  }, [gAuthIsLoading]);

  return (
    <Container>
      <Spinner style={{ marginTop: "35px" }} animation="grow" />
    </Container>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gAuthIsLoading: gState.auth.isLoading,
  gAuthData: gState.auth.user,
});

export default connect(mapStateToProps, { gSetCurrentPage, gFetchUser })(
  AuthLoading
);
