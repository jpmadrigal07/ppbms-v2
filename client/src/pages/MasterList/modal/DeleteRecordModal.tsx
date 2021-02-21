import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  I_GlobalState,
  I_DeleteRecordModal
} from "../../../interfaces";
import { deleteRecord } from "../../../actions/recordActions";
import { triggerSecondModalTopAlert } from "../../../actions/secondModalTopAlertActions";
import SecondModalTopAlert from "../../../components/Alert/SecondModalTopAlert";
import _ from "lodash";

const DeleteRecordModal = (
  props: I_DeleteRecordModal
) => {
  const {
    selectedRecordSubsName,
    selectedRecordId,
    recordData,
    deleteRecord,
    isDeleteRecordModalOpen,
    setIsDeleteRecordModalOpen,
    triggerSecondModalTopAlert,
    isRecordDeleteLoading
  } = props;

  const [hideUI, setHideUI] = useState(false);

  useEffect(() => {
    if(!isDeleteRecordModalOpen) {
      triggerSecondModalTopAlert(false, "", "");
    }
  }, [isDeleteRecordModalOpen]);

  useEffect(() => {
    const barcodeArr = recordData.filter(
      (data) => data._id === selectedRecordId
    );
    if (barcodeArr.length > 0) {
      setHideUI(false);
    } else {
      setHideUI(true);
    }
  }, [recordData, isDeleteRecordModalOpen]);

  const deleteRecordData = () => {
    if (selectedRecordId === "") {
      triggerSecondModalTopAlert(true, "Incomplete data", "warning");
    } else {
        deleteRecord(selectedRecordId);
    }
  };

  return (
    <Modal
      show={isDeleteRecordModalOpen}
      onHide={() => setIsDeleteRecordModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SecondModalTopAlert />
        {!hideUI ? (
          <p>Are you still sure you want to delete the record of {selectedRecordSubsName}?</p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsDeleteRecordModalOpen(false)}
        >
          {isRecordDeleteLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        {!hideUI ? (
          <Button variant="primary" onClick={() => deleteRecordData()}>
            {isRecordDeleteLoading ? (
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
    isRecordDeleteLoading: gState.record.isDeleteLoading,
    recordData: gState.record.data
});

export default connect(mapStateToProps, {
  deleteRecord,
  triggerSecondModalTopAlert,
})(DeleteRecordModal);
