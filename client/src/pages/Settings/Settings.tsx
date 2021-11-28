import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  Form,
  Button,
  Container,
  Spinner,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import { I_SettingsProps, I_GlobalState } from "../../interfaces";
import { getUser, updateUser } from "../../actions/userActions";
import { triggerTopAlert } from "../../actions/topAlertActions";
import _ from "lodash";

const Settings = (props: I_SettingsProps) => {
  const {
    getUser,
    userIsLoading,
    userData,
    authData,
    updateUser,
    triggerTopAlert
  } = props;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!_.isNil(authData) && _.isNil(userData)) {
      getUser(authData._id);
    }
  }, [authData]);

  useEffect(() => {
    if(!_.isNil(userData) && newPassword === userData.dbRes.password) {
      setOldPassword("")
      setNewPassword("")
    }
  }, [userData]);

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();
    if (oldPassword === "" || newPassword === "") {
      triggerTopAlert(true, "Please complete all the inputs", "warning")
    } else {
      if (userData.dbRes.password === oldPassword) {
        try {
          await updateUser(userData.dbRes._id, newPassword);
        } catch (err: any) {
          triggerTopAlert(true, err.message, "danger")
        }
      } else {
        triggerTopAlert(true, "Old password is wrong", "danger")
      }
    }
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Header as="h5">Change Password</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form onSubmit={handleUpdatePassword}>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={oldPassword}
                      disabled={userIsLoading}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      disabled={userIsLoading}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    {userIsLoading ? (
                      <Spinner animation="grow" variant="light" size="sm" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Form>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  userIsLoading: gState.user.isLoading,
  userData: gState.user.data,
  authData: gState.auth.user
});

export default connect(mapStateToProps, { getUser, updateUser, triggerTopAlert })(Settings);
