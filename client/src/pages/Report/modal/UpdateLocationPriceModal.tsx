import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { I_GlobalState, I_UpdateLocationPriceModal } from "../../../interfaces";
import { updateAreaPrice } from "../../../actions/areaPriceActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import _ from "lodash";

const UpdateLocationPriceModal = (props: I_UpdateLocationPriceModal) => {
  const {
    areaPriceId,
    areaPriceName,
    areaPricePrice,
    updateAreaPrice,
    triggerModalTopAlert,
    isUpdateLocationPriceModalOpen,
    setIsUpdateLocationPriceModalOpen,
    isAreaPriceUpdateLoading
  } = props;

  const [areaPriceNameUpdated, setAreaPriceNameUpdated] = useState("");
  const [areaPricePriceUpdated, setAreaPricePriceUpdated] = useState(0);

  useEffect(() => {
    setAreaPriceNameUpdated(areaPriceName);
    setAreaPricePriceUpdated(areaPricePrice);
  }, [areaPriceName, areaPricePrice]);

  useEffect(() => {
    if(isUpdateLocationPriceModalOpen) {
      setAreaPriceNameUpdated(areaPriceName);
      setAreaPricePriceUpdated(areaPricePrice);
    } else {
      triggerModalTopAlert(false, "", "");
    }
  }, [isUpdateLocationPriceModalOpen]);

  const saveChanges = () => {
    if (
      areaPriceNameUpdated === "" ||
      areaPricePriceUpdated === 0 ||
      _.isNil(areaPricePriceUpdated)
    ) {
      triggerModalTopAlert(true, "Please complete all the inputs", "warning");
    } else {
      updateAreaPrice(areaPriceId, areaPriceNameUpdated, areaPricePriceUpdated);
    }
  };

  return (
    <Modal
      show={isUpdateLocationPriceModalOpen}
      onHide={() => setIsUpdateLocationPriceModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Area Price</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTopAlert />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            disabled={isAreaPriceUpdateLoading}
            onChange={(e) => setAreaPriceNameUpdated(e.target.value)}
            value={areaPriceNameUpdated}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            disabled={isAreaPriceUpdateLoading}
            onChange={(e) => setAreaPricePriceUpdated(parseInt(e.target.value))}
            value={areaPricePriceUpdated}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsUpdateLocationPriceModalOpen(false)}
        >
          {isAreaPriceUpdateLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        <Button variant="primary" onClick={() => saveChanges()}>
          {isAreaPriceUpdateLoading ? (
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
  isAreaPriceUpdateLoading: gState.areaPrice.isUpdateLoading
});

export default connect(mapStateToProps, {
  updateAreaPrice,
  triggerModalTopAlert,
})(UpdateLocationPriceModal);
