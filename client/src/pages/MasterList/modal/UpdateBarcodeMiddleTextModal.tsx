import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { I_GlobalState, I_UpdateBarcodeMiddleTextModal } from "../../../interfaces";
import { updateBarcodeMiddleText } from "../../../actions/barcodeMiddleTextActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import _ from "lodash";

const UpdateBarcodeMiddleTextModal = (props: I_UpdateBarcodeMiddleTextModal) => {
  const {
    barcodeMiddleTextId,
    barcodeMiddleTextCode,
    updateBarcodeMiddleText,
    triggerModalTopAlert,
    isUpdateBarcodeMiddleTextModalOpen,
    setIsUpdateBarcodeMiddleTextModalOpen,
    isBarcodeMiddleTextUpdateLoading
  } = props;

  const [barcodeMiddleTextCodeUpdated, setBarcodeMiddleTextCodeUpdated] = useState("");

  useEffect(() => {
    setBarcodeMiddleTextCodeUpdated(barcodeMiddleTextCode);
  }, [barcodeMiddleTextCode]);

  useEffect(() => {
    if(isUpdateBarcodeMiddleTextModalOpen) {
      setBarcodeMiddleTextCodeUpdated(barcodeMiddleTextCode);
    } else {
      triggerModalTopAlert(false, "", "");
    }
  }, [isUpdateBarcodeMiddleTextModalOpen]);

  const saveChanges = () => {
    if (
      barcodeMiddleTextCode === ""
    ) {
      triggerModalTopAlert(true, "Please complete all the inputs", "warning");
    } else {
      updateBarcodeMiddleText(barcodeMiddleTextId, barcodeMiddleTextCodeUpdated);
    }
  };

  return (
    <Modal
      show={isUpdateBarcodeMiddleTextModalOpen}
      onHide={() => setIsUpdateBarcodeMiddleTextModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Barcode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTopAlert />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            disabled={isBarcodeMiddleTextUpdateLoading}
            onChange={(e) => setBarcodeMiddleTextCodeUpdated(e.target.value)}
            value={barcodeMiddleTextCodeUpdated}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsUpdateBarcodeMiddleTextModalOpen(false)}
        >
          {isBarcodeMiddleTextUpdateLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        <Button variant="primary" onClick={() => saveChanges()}>
          {isBarcodeMiddleTextUpdateLoading ? (
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
  isBarcodeMiddleTextUpdateLoading: gState.barcodeMiddleText.isUpdateLoading
});

export default connect(mapStateToProps, {
  updateBarcodeMiddleText,
  triggerModalTopAlert,
})(UpdateBarcodeMiddleTextModal);
