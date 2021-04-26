import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  I_GlobalState,
  I_DeleteMessengerModal
} from "../../../interfaces";
import { deleteDispatchControlMessenger } from "../../../actions/dispatchControlMessengerActions";
import { triggerSecondModalTopAlert } from "../../../actions/secondModalTopAlertActions";
import SecondModalTopAlert from "../../../components/Alert/SecondModalTopAlert";
import _ from "lodash";

const DeleteMessengerModal = (
  props: I_DeleteMessengerModal
) => {
  const {
    selectedMessengerId,
    selectedMessengerName,
    messengerData,
    deleteDispatchControlMessenger,
    isDeleteMessengerModalOpen,
    setIsDeleteMessengerModalOpen,
    triggerSecondModalTopAlert,
    isMessengerDeleteLoading
  } = props;

  const [hideUI, setHideUI] = useState(false);

  useEffect(() => {
    if(!isDeleteMessengerModalOpen) {
      triggerSecondModalTopAlert(false, "", "");
    }
  }, [isDeleteMessengerModalOpen]);

  useEffect(() => {
    const barcodeArr = messengerData.filter(
      (data) => data._id === selectedMessengerId
    );
    if (barcodeArr.length > 0) {
      setHideUI(false);
    } else {
      setHideUI(true);
    }
  }, [messengerData, isDeleteMessengerModalOpen]);

  const deleteRecordData = () => {
    if (selectedMessengerId === "") {
        triggerSecondModalTopAlert(true, "Incomplete data", "warning");
    } else {
        deleteDispatchControlMessenger(selectedMessengerId);
    }
  };

  return (
    <Modal
      show={isDeleteMessengerModalOpen}
      onHide={() => setIsDeleteMessengerModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Messenger</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SecondModalTopAlert />
        {!hideUI ? (
          <p>Are you still sure you want to delete messenger {selectedMessengerName}?</p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsDeleteMessengerModalOpen(false)}
        >
          {isMessengerDeleteLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        {!hideUI ? (
          <Button variant="primary" onClick={() => deleteRecordData()}>
            {isMessengerDeleteLoading ? (
              <Spinner animation="grow" variant="light" size="sm" />
            ) : (
              "Yes"
            )}
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
    isMessengerDeleteLoading: gState.dispatchControlMessenger.isDeleteLoading,
    messengerData: gState.dispatchControlMessenger.data
});

export default connect(mapStateToProps, {
  deleteDispatchControlMessenger,
  triggerSecondModalTopAlert,
})(DeleteMessengerModal);
