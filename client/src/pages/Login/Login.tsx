import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
import { Alert, Card, Form, Button, Spinner, Row, Col, Container } from 'react-bootstrap';

const Login = () => {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setisLoading(true);
    setShowAlert(false)
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
      // try {
      //   const res = await loginUser({
      //     username: username,
      //     password: password,
      //   });
      //   if (!_.isNil(res.data) && res.data !== "") {
      //     if(!res.data) {
      //       setShowAlert(true)
      //       setAlertHeading("Ooopss...")
      //       setAlertMessage("This account doesn't exist in PPBMS database.")
      //       setAlertType("warning")
      //     } else {
      //       if (!res.data.role === 'Admin') {
      //         setShowAlert(true)
      //         setAlertHeading("Oh no...")
      //         setAlertMessage("You are not permitted to access PPBMS.")
      //         setAlertType("error")
      //       } else {
      //         setShowAlert(true)
      //         setAlertHeading("Nice...")
      //         setAlertMessage("You are logged in.")
      //         setAlertType("success")
      //       }
      //     }
      //     setisLoading(false);
      //   } else {
      //     setShowAlert(true)
      //     setAlertHeading("Oh oh...")
      //     setAlertMessage("Unkown error occured.")
      //     setAlertType("danger")
      //   }
      // } catch (err) {
      //   setShowAlert(true)
      //   setAlertHeading("Oh oh...")
      //   setAlertMessage(err.message)
      //   setAlertType("danger")
      //   setisLoading(false);
      // }
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

export default Login;