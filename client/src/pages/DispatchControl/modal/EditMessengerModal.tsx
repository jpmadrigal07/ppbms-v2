import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  I_GlobalState,
  I_EditMessengerModal
} from "../../../interfaces";
import { updateDispatchControlMessenger } from "../../../actions/dispatchControlMessengerActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import moment from "moment";

const EditMessengerModal = (
  props: I_EditMessengerModal
) => {
  const {
    selectedMessengerName,
    selectedMessengerId,
    selectedMessengerAddress,
    selectedMessengerPrepared,
    selectedMessengerDate,
    isEditMessengerModalOpen,
    messengerData,
    updateDispatchControlMessenger,
    setIsEditMessengerModalOpen,
    triggerModalTopAlert,
    isMessengerEditLoading
  } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if(!isEditMessengerModalOpen) {
      triggerModalTopAlert(false, "", "");
    }
  }, [isEditMessengerModalOpen]);

  useEffect(() => {
    setName(selectedMessengerName)
    setAddress(selectedMessengerAddress)
    setPreparedBy(selectedMessengerPrepared)
    setDate(moment(new Date(selectedMessengerDate.toString())).format("MM/DD/YYYY"))
  }, [selectedMessengerName]);

  const updateMessengerData = () => {
    if (selectedMessengerId === "" && name === "" && address === "" && preparedBy === "" && date === "") {
      triggerModalTopAlert(true, "Incomplete data", "warning");
    } else {
      updateDispatchControlMessenger(selectedMessengerId, name, address, preparedBy, date);
    }
  };

  return (
    <Modal
      show={isEditMessengerModalOpen}
      onHide={() => setIsEditMessengerModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Messenger</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTopAlert />
          <Form.Group controlId="formBasicPassword">
              <Form.Label>Messenger Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                disabled={isMessengerEditLoading}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                disabled={isMessengerEditLoading}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Prepared By</Form.Label>
              <Form.Control
                type="text"
                value={preparedBy}
                disabled={isMessengerEditLoading}
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
                disabled={isMessengerEditLoading}
                onChange={(date: Date) =>
                  setDate(
                    moment(new Date(date.toString())).format("MM/DD/YYYY")
                  )
                }
              />
            </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsEditMessengerModalOpen(false)}
        >
          {isMessengerEditLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        <Button variant="primary" onClick={() => updateMessengerData()}>
          {isMessengerEditLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Save"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
    isMessengerEditLoading: gState.dispatchControlMessenger.isUpdateLoading,
    messengerData: gState.dispatchControlMessenger.data
});

export default connect(mapStateToProps, {
  updateDispatchControlMessenger,
  triggerModalTopAlert,
})(EditMessengerModal);
