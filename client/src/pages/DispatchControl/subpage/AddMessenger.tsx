import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Form, Button, Spinner, Col, Row } from "react-bootstrap";
import { addDispatchControlMessenger } from "../../../actions/dispatchControlMessengerActions";
import { triggerTopAlert } from "../../../actions/topAlertActions";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddMessenger.scss";
import { I_AddMessengerProps, I_GlobalState } from "../../../interfaces";
import moment from "moment";

const AddMessenger = (props: I_AddMessengerProps) => {
  const {
    addDispatchControlMessenger,
    triggerTopAlert,
    isAddDispatchControlMessengerLoading,
    dispatchControlMessengerData,
  } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const result = dispatchControlMessengerData.find(
      (data) =>
        data.name === name &&
        moment(new Date(data.date.toString())).format("MM/DD/YYYY") === date
    );
    if (result) {
      setName("");
      setAddress("");
      setPreparedBy("");
      setDate("");
    }
  }, [isAddDispatchControlMessengerLoading]);

  const handleAddMessenger = async (e: any) => {
    e.preventDefault();
    if (name === "" || address === "" || preparedBy === "" || date === "") {
      triggerTopAlert(true, "Please complete all the inputs", "warning");
    } else {
      try {
        await addDispatchControlMessenger(name, address, preparedBy, date);
      } catch (err) {
        triggerTopAlert(true, err.message, "danger");
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleAddMessenger} style={{ marginTop: "25px" }}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Messenger Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                disabled={isAddDispatchControlMessengerLoading}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                disabled={isAddDispatchControlMessengerLoading}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Prepared By</Form.Label>
              <Form.Control
                type="text"
                value={preparedBy}
                disabled={isAddDispatchControlMessengerLoading}
                onChange={(e) => setPreparedBy(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Date</Form.Label>
              <br />
              <DatePicker
                id="formBasicPassword"
                className="form-control"
                value={date}
                autoComplete="off"
                disabled={isAddDispatchControlMessengerLoading}
                onChange={(date: Date) =>
                  setDate(
                    moment(new Date(date.toString())).format("MM/DD/YYYY")
                  )
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isAddDispatchControlMessengerLoading ? (
                <Spinner animation="grow" variant="light" size="sm" />
              ) : (
                "Add"
              )}
            </Button>
          </Form>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  isAddDispatchControlMessengerLoading: gState.dispatchControlMessenger.isAddLoading,
  dispatchControlMessengerData: gState.dispatchControlMessenger.data,
});

export default connect(mapStateToProps, {
  addDispatchControlMessenger,
  triggerTopAlert,
})(AddMessenger);
