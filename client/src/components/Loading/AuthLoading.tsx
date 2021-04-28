import React from "react";
import { Container, Spinner } from "react-bootstrap";
import _ from "lodash";

const AuthLoading = () => {
  return (
    <Container>
      <Spinner style={{ marginTop: "35px" }} animation="grow" />
    </Container>
  );
};

export default AuthLoading;
