import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Spinner, Button } from "react-bootstrap";
import { I_MasterListSettingsProps, I_GlobalState } from "../../../interfaces";
import { getBarcodeMiddleText } from "../../../actions/barcodeMiddleTextActions";
import { triggerTopAlert } from "../../../actions/topAlertActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import UpdateBarcodeMiddleTextModal from "../modal/UpdateBarcodeMiddleTextModal";
import DeleteBarcodeMiddleTextModal from "../modal/DeleteBarcodeMiddleTextModal";
import AddBarcodeMiddleTextModal from "../modal/AddBarcodeMiddleTextModal";
import _ from "lodash";

const MasterListSettings = (props: I_MasterListSettingsProps) => {
  const {
    getBarcodeMiddleText,
    isBarcodeMiddleTextLoading,
    barcodeMiddleTextData,
    triggerModalTopAlert,
  } = props;

  useEffect(() => {
    getBarcodeMiddleText();
  }, []);

  const [
    selectedBarcodeMiddleTextId,
    setSelectedBarcodeMiddleTextId,
  ] = useState("");
  const [
    selectedBarcodeMiddleTextCode,
    setSelectedBarcodeMiddleTextCode,
  ] = useState("");
  const [
    isUpdateBarcodeMiddleTextModalOpen,
    setIsUpdateBarcodeMiddleTextModalOpen,
  ] = useState(false);
  const [
    isDeleteBarcodeMiddleTextModalOpen,
    setIsDeleteBarcodeMiddleTextModalOpen,
  ] = useState(false);
  const [
    isAddBarcodeMiddleTextModalOpen,
    setIsAddBarcodeMiddleTextModalOpen,
  ] = useState(false);

  const showUpdateBarcodeMiddleTextModal = (code: string, id: string) => {
    triggerModalTopAlert(false, "", "");
    setSelectedBarcodeMiddleTextCode(code);
    setSelectedBarcodeMiddleTextId(id);
    setIsUpdateBarcodeMiddleTextModalOpen(true);
  };

  const showDeleteBarcodeMiddleTextModal = (code: string, id: string) => {
    triggerModalTopAlert(false, "", "");
    setSelectedBarcodeMiddleTextCode(code);
    setSelectedBarcodeMiddleTextId(id);
    setIsDeleteBarcodeMiddleTextModalOpen(true);
  };

  const showAddBarcodeMiddleTextModal = () => {
    triggerModalTopAlert(false, "", "");
    setIsAddBarcodeMiddleTextModalOpen(true);
  };

  const renderBarcode = (code: string, id: string, index: number) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{code}</td>
        <td>
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => showUpdateBarcodeMiddleTextModal(code, id)}
          >
            Edit
          </span>{" "}
          |{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => showDeleteBarcodeMiddleTextModal(code, id)}
          >
            Delete
          </span>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ marginTop: "25px" }}
        onClick={() => showAddBarcodeMiddleTextModal()}
      >
        Add Barcode
      </Button>
      {barcodeMiddleTextData.length > 0 ? (
        <Table striped bordered hover style={{ marginTop: "15px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {barcodeMiddleTextData
              .slice(0)
              .reverse()
              .map((barcodeMiddleText, index) =>
                renderBarcode(
                  barcodeMiddleText.code,
                  barcodeMiddleText._id,
                  index
                )
              )}
          </tbody>
        </Table>
      ) : (
        <h5 style={{ color: "gray", marginTop: "15px" }}>No data found.</h5>
      )}
      <UpdateBarcodeMiddleTextModal
        barcodeMiddleTextId={selectedBarcodeMiddleTextId}
        barcodeMiddleTextCode={selectedBarcodeMiddleTextCode}
        isUpdateBarcodeMiddleTextModalOpen={isUpdateBarcodeMiddleTextModalOpen}
        setIsUpdateBarcodeMiddleTextModalOpen={(res: boolean) =>
          setIsUpdateBarcodeMiddleTextModalOpen(res)
        }
      />
      <DeleteBarcodeMiddleTextModal
        barcodeMiddleTextId={selectedBarcodeMiddleTextId}
        barcodeMiddleTextCode={selectedBarcodeMiddleTextCode}
        isDeleteBarcodeMiddleTextModalOpen={isDeleteBarcodeMiddleTextModalOpen}
        setIsDeleteBarcodeMiddleTextModalOpen={(res: boolean) =>
          setIsDeleteBarcodeMiddleTextModalOpen(res)
        }
        barcodeMiddleTextData={barcodeMiddleTextData}
      />
      <AddBarcodeMiddleTextModal
        isAddBarcodeMiddleTextModalOpen={isAddBarcodeMiddleTextModalOpen}
        setIsAddBarcodeMiddleTextModalOpen={(res: boolean) =>
          setIsAddBarcodeMiddleTextModalOpen(res)
        }
        barcodeMiddleTextData={barcodeMiddleTextData}
      />
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  isBarcodeMiddleTextLoading: gState.barcodeMiddleText.isLoading,
  barcodeMiddleTextData: gState.barcodeMiddleText.data,
});

export default connect(mapStateToProps, {
  getBarcodeMiddleText,
  triggerTopAlert,
  triggerModalTopAlert,
})(MasterListSettings);
