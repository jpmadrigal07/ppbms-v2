import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  I_GlobalState,
  I_DeleteEncodeListModal
} from "../../../interfaces";
import { deleteEncodeList } from "../../../actions/encodeListActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import _ from "lodash";

const DeleteEncodeListModal = (
  props: I_DeleteEncodeListModal
) => {
  const {
    selectedEncodeListFileName,
    selectedEncodeListId,
    encodeListData,
    deleteEncodeList,
    isDeleteEncodeListModalOpen,
    setIsDeleteEncodeListModalOpen,
    isEncodeListDeleteLoading
  } = props;

  const [hideUI, setHideUI] = useState(false);

  useEffect(() => {
    if (!isDeleteEncodeListModalOpen) {
      triggerModalTopAlert(false, "", "");
    }
  }, [isDeleteEncodeListModalOpen]);

  useEffect(() => {
    const barcodeArr = encodeListData.filter(
      (data) => data._id === selectedEncodeListId
    );
    if (barcodeArr.length > 0) {
      setHideUI(false);
    } else {
      setHideUI(true);
    }
  }, [encodeListData, isDeleteEncodeListModalOpen]);

  const deleteEncodListData = () => {
    if (selectedEncodeListId === "") {
      triggerModalTopAlert(true, "Incomplete data", "warning");
    } else {
      deleteEncodeList(selectedEncodeListId);
    }
  };

  return (
    <Modal
      show={isDeleteEncodeListModalOpen}
      onHide={() => setIsDeleteEncodeListModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Encode List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTopAlert />
        {!hideUI ? (
          <p>Note that the records that are connected to this encode list item will also be deleted. Are you still sure you want to delete {selectedEncodeListFileName}?</p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsDeleteEncodeListModalOpen(false)}
        >
          {isEncodeListDeleteLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        {!hideUI ? (
          <Button variant="primary" onClick={() => deleteEncodListData()}>
            {isEncodeListDeleteLoading ? (
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
  isEncodeListDeleteLoading: gState.encodeList.isDeleteLoading
});

export default connect(mapStateToProps, {
  deleteEncodeList,
  triggerModalTopAlert,
})(DeleteEncodeListModal);
