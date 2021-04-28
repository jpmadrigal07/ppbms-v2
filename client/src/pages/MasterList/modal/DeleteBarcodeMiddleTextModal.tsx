import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  I_GlobalState,
  I_DeleteBarcodeMiddleTextModal,
  I_BarcodeMiddleText,
} from "../../../interfaces";
import { deleteBarcodeMiddleText } from "../../../actions/barcodeMiddleTextActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import _ from "lodash";

const UpdateBarcodeMiddleTextModal = (
  props: I_DeleteBarcodeMiddleTextModal
) => {
  const {
    barcodeMiddleTextId,
    barcodeMiddleTextCode,
    deleteBarcodeMiddleText,
    triggerModalTopAlert,
    isDeleteBarcodeMiddleTextModalOpen,
    setIsDeleteBarcodeMiddleTextModalOpen,
    isBarcodeMiddleTextDeleteLoading,
    barcodeMiddleTextData,
  } = props;

  const [hideUI, setHideUI] = useState(false);

  useEffect(() => {
    if (!isDeleteBarcodeMiddleTextModalOpen) {
      triggerModalTopAlert(false, "", "");
    }
  }, [isDeleteBarcodeMiddleTextModalOpen]);

  useEffect(() => {
    const barcodeArr = barcodeMiddleTextData.filter(
      (data) => data._id === barcodeMiddleTextId
    );
    if (barcodeArr.length > 0) {
      setHideUI(false);
    } else {
      setHideUI(true);
    }
  }, [barcodeMiddleTextData, isDeleteBarcodeMiddleTextModalOpen]);

  const deleteBarcode = () => {
    if (barcodeMiddleTextId === "") {
      triggerModalTopAlert(true, "Incomplete data", "warning");
    } else {
      deleteBarcodeMiddleText(barcodeMiddleTextId);
    }
  };

  return (
    <Modal
      show={isDeleteBarcodeMiddleTextModalOpen}
      onHide={() => setIsDeleteBarcodeMiddleTextModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Barcode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTopAlert />
        {!hideUI ? (
          <p>Are you sure you want to delete {barcodeMiddleTextCode} ?</p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsDeleteBarcodeMiddleTextModalOpen(false)}
        >
          {isBarcodeMiddleTextDeleteLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        {!hideUI ? (
          <Button variant="primary" onClick={() => deleteBarcode()}>
            {isBarcodeMiddleTextDeleteLoading ? (
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
  isBarcodeMiddleTextDeleteLoading: gState.barcodeMiddleText.isDeleteLoading,
});

export default connect(mapStateToProps, {
  deleteBarcodeMiddleText,
  triggerModalTopAlert,
})(UpdateBarcodeMiddleTextModal);
