import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Table, Pagination, Spinner, Row, Col } from "react-bootstrap";
import { I_GlobalState, I_DispatchControlData } from "../../../interfaces";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import { getDispatchControlData } from "../../../actions/dispatchControlDataActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import { dispatchControlDataPaginationDataCount } from "../../../constant";
import { smallDataChunkArrayForPagination } from "../../../helper";
import _ from "lodash";
import moment from "moment";

const MessengerRecordModal = (props: any) => {
  const {
    selectedMessengerId,
    isMessengerRecordModalOpen,
    setIsMessengerRecordModalOpen,
    isDispatchControlDataLoading,
    getDispatchControlData,
    dispatchControlData,
    selectedMessengerName,
    selectedMessengerAddress,
    selectedMessengerPrepared,
    selectedMessengerDate,
  } = props;

  const [selectedDispatchControlData, setSelectedDispatchControlData] = useState<I_DispatchControlData[]>([]);
  const [dispatchControlDataPagination, setDispatchControlDataPagination] = useState<any>([]);
  const [dispatchControlDataCurrentPage, setDispatchControlDataCurrentPage] = useState(0);

  useEffect(() => {
    const isDispatchControlDataExist = dispatchControlData.find((res: I_DispatchControlData) => res.messengerId === selectedMessengerId);
    if (isMessengerRecordModalOpen && !_.isNil(selectedMessengerId) && _.isNil(isDispatchControlDataExist)) {
        const condition = `{"messengerId": "${selectedMessengerId}"}`;
        const urlVariables = `?condition=${encodeURIComponent(condition)}`;
        getDispatchControlData(urlVariables);
    } else {
        setDispatchControlDataPagination([]);
    }
  }, [isMessengerRecordModalOpen]);

  useEffect(() => {
    console.log( 'yow 1', isDispatchControlDataLoading );
    if (dispatchControlData.length > 0 && !isDispatchControlDataLoading) {
      console.log( 'yow 2', dispatchControlData );
        setSelectedDispatchControlData(
            dispatchControlData.filter((res: I_DispatchControlData) => res.messengerId === selectedMessengerId)
        );
    }
  }, [dispatchControlData, isDispatchControlDataLoading]);

  useEffect(() => {
    if (
        isMessengerRecordModalOpen &&
        selectedDispatchControlData.length > 0 &&
      !isDispatchControlDataLoading
    ) {
      const reversedSelectedDispatchControlData = selectedDispatchControlData.slice(0).reverse();
      setDispatchControlDataPagination(
        smallDataChunkArrayForPagination(
            reversedSelectedDispatchControlData,
            5,
        )
      );
    }
  }, [selectedDispatchControlData, isMessengerRecordModalOpen]);

  const renderDispatchControlData = (
    cycleCode: String,
    pickupDate: string,
    sender: string,
    delType: string,
    index: number,
  ) => {
    const itemNumber =
      dispatchControlDataCurrentPage * dispatchControlDataPaginationDataCount + (index + 1);
    const pickupDateFormatted = !_.isNil(pickupDate)
      ? moment(pickupDate).format("MM/DD/YYYY")
      : "";
    return (
      <tr key={index}>
        <td>{itemNumber}</td>
        <td>{cycleCode}</td>
        <td>{pickupDateFormatted}</td>
        <td>{sender} {delType}</td>
        <td>Pieces</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>Manually Assign Receipt | Import to Assign Receipt</td>
      </tr>
    );
  };

  const renderRecordTable = () => {
    if(isMessengerRecordModalOpen && dispatchControlDataPagination.length > 0 && !isDispatchControlDataLoading) {
      return <>
      <div style={{ overflow: "auto" }}>
        <Row>
          <Col>
            <h5>Messenger Name: {selectedMessengerName}</h5>
          </Col>
          <Col>
            <h5>Address: {selectedMessengerAddress}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Prepared by: {selectedMessengerPrepared}</h5>
          </Col>
          <Col>
            <h5>Date: {moment(selectedMessengerDate).format("MMM D, YYYY")}</h5>
          </Col>
        </Row>
        <hr/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>CYCLE CODE</th>
              <th>PICK-UP DATE</th>
              <th>PRODUCT DESCRIPTION</th>
              <th>UNIT</th>
              <th>QUANTITY</th>
              <th>ITEM RECEIVED</th>
              <th>ITEM NOT RECEIVED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {dispatchControlDataPagination[dispatchControlDataCurrentPage].data.map(
              (dispatchControl: I_DispatchControlData, index: number) => {
                return renderDispatchControlData(
                  dispatchControl.dataCycleCode,
                  dispatchControl.pickupDate,
                  dispatchControl.sender,
                  dispatchControl.delType,
                  index
                );
              }
            )}
          </tbody>
        </Table>
      </div>
      <Pagination style={{ marginTop: "15px" }}>
        {dispatchControlDataCurrentPage > 0 ? (
          <>
            <Pagination.First onClick={() => setDispatchControlDataCurrentPage(0)} />
            <Pagination.Prev
              onClick={() =>
                setDispatchControlDataCurrentPage(dispatchControlDataCurrentPage - 1)
              }
            />
          </>
        ) : null}
        <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
          {dispatchControlDataCurrentPage + 1} of {dispatchControlDataPagination.length}
        </h3>
        {dispatchControlDataCurrentPage + 1 < dispatchControlDataPagination.length ? (
          <>
            <Pagination.Next
              onClick={() =>
                setDispatchControlDataCurrentPage(dispatchControlDataCurrentPage + 1)
              }
            />
            <Pagination.Last
              onClick={() =>
                setDispatchControlDataCurrentPage(dispatchControlDataPagination.length - 1)
              }
            />
          </>
        ) : null}
      </Pagination>
    </>
    } else if(isMessengerRecordModalOpen && isDispatchControlDataLoading) {
      return <Spinner animation="grow" />
    } else {
      return <h5 style={{ color: "gray" }}>No data found.</h5>
    }
  }

  return (
    <>
      <Modal
        show={isMessengerRecordModalOpen}
        onHide={() => setIsMessengerRecordModalOpen(false)}
        size="xl"
        className="SampleClass"
      >
        <Modal.Header closeButton>
          <Modal.Title>Messenger Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalTopAlert />
          {renderRecordTable()}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsMessengerRecordModalOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
    dispatchControlData: gState.dispatchControlData.data,
    isDispatchControlDataLoading: gState.dispatchControlData.isLoading
});

export default connect(mapStateToProps, { triggerModalTopAlert, getDispatchControlData })(
  MessengerRecordModal
);
