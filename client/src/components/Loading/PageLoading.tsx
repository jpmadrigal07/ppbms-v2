import React from "react";
import { Container, Spinner } from "react-bootstrap";

const PageLoading = () => {
  return (
    <Container>
      <Spinner style={{ marginTop: "35px" }} animation="grow" />
    </Container>
  );
};

export default (PageLoading);
