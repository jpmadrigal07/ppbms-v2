import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Alert, Card, Form, Button, Spinner, Row, Col, Container } from 'react-bootstrap';
import { loginUser } from '../../actions/authActions';
import { gSetCurrentPage } from "../../actions/navBarActions";
import { gFetchUser } from "../../actions/authActions";
import { I_GlobalState, I_LoginProps } from "../../interfaces";
import { connect } from "react-redux";

const Login = (props: I_LoginProps) => {
  const { gSetCurrentPage, gAuthData, gAuthIsLoading, loginUser, gFetchUser } = props;

  const [isLoading, setisLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeading, setAlertHeading] = useState("Error");
  const [alertMessage, setAlertMessage] = useState("Sample message");
  const [alertType, setAlertType] = useState("danger");

  const resetLocalState = () => {
    setisLoading(false);
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    return () => {
      resetLocalState()
    }
  }, []);

  useEffect(() => {
    if(isLoggingIn) {
      if (!_.isNil(gAuthData) && gAuthData !== "") {
        if(!gAuthData) {
          setShowAlert(true)
          setAlertHeading("Ooopss...")
          setAlertMessage("This account doesn't exist in PPBMS database.")
          setAlertType("warning")
          // return the user data value to null
          gFetchUser();
        } else {
          gSetCurrentPage("Dashboard")
        }
        setisLoading(false);
        setIsLoggingIn(false);
      } else {
        setShowAlert(true)
        setAlertHeading("Oh oh...")
        setAlertMessage("Unkown error occured.")
        setAlertType("danger")
        setisLoading(false);
        setIsLoggingIn(false);
      }
    }
  }, [gAuthData]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setisLoading(false);
    setShowAlert(false)
    setIsLoggingIn(true);
    if (
      username === "" ||
      password === ""
    ) {
      setShowAlert(true)
      setAlertHeading("Ooopss...")
      setAlertMessage("Please complete all the inputs.")
      setAlertType("warning")
      setisLoading(false);
    } else {
      setisLoading(true);
      try {
        await loginUser({
          username: username,
          password: password,
        });
      } catch (err) {
        setShowAlert(true)
        setAlertHeading("Oh oh...")
        setAlertMessage(err.message)
        setAlertType("danger")
        setisLoading(false);
      }
    }
  };

  const renderForm = () => {
      return (
        <>
          <Alert variant={alertType} show={showAlert} onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>{alertHeading}</Alert.Heading>
            <p>
              {alertMessage}
            </p>
          </Alert>
          <Card>
            <Card.Header>PPBMS</Card.Header>
            <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isLoading ? (
                  <Spinner animation="grow" variant="light" size="sm" />
                ) : (
                  "Log me in!"
                )}
              </Button>
            </Form>
            </Card.Body>
          </Card>
        </>
      );
  };

  return (
    <Container>
      <Row> 
        <Col md={{ span: 6, offset: 3 }} style={{marginTop: '50px'}}>{renderForm()}</Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gAuthIsLoading: gState.auth.isLoading,
  gAuthData: gState.auth.user
});

export default connect(mapStateToProps, { gSetCurrentPage, loginUser, gFetchUser })(Login);