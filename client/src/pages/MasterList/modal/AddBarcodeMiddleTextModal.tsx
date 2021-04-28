import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { I_GlobalState, I_AddBarcodeMiddleTextModal } from "../../../interfaces";
import { addBarcodeMiddleText } from "../../../actions/barcodeMiddleTextActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import _ from "lodash";

const AddBarcodeMiddleTextModal = (props: I_AddBarcodeMiddleTextModal) => {
  const {
    addBarcodeMiddleText,
    triggerModalTopAlert,
    isAddBarcodeMiddleTextModalOpen,
    setIsAddBarcodeMiddleTextModalOpen,
    isBarcodeMiddleTextAddLoading,
    barcodeMiddleTextData
  } = props;

  const [barcodeMiddleTextCode, setBarcodeMiddleTextCode] = useState("");

  useEffect(() => {
    const barcodeArr = barcodeMiddleTextData.filter(
      (data) => data.code === barcodeMiddleTextCode
    );
    if (barcodeArr.length > 0) {
      setBarcodeMiddleTextCode("");
    }
  }, [barcodeMiddleTextData]);

  const save = () => {
    if (
      barcodeMiddleTextCode === ""
    ) {
      triggerModalTopAlert(true, "Please complete all the inputs", "warning");
    } else {
      addBarcodeMiddleText(barcodeMiddleTextCode);
    }
  };

  return (
    <Modal
      show={isAddBarcodeMiddleTextModalOpen}
      onHide={() => setIsAddBarcodeMiddleTextModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Barcode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTopAlert />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            disabled={isBarcodeMiddleTextAddLoading}
            onChange={(e) => setBarcodeMiddleTextCode(e.target.value)}
            value={barcodeMiddleTextCode}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsAddBarcodeMiddleTextModalOpen(false)}
        >
          {isBarcodeMiddleTextAddLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        <Button variant="primary" onClick={() => save()}>
          {isBarcodeMiddleTextAddLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Add"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  isBarcodeMiddleTextAddLoading: gState.barcodeMiddleText.isAddLoading
});

export default connect(mapStateToProps, {
  addBarcodeMiddleText,
  triggerModalTopAlert,
})(AddBarcodeMiddleTextModal);
