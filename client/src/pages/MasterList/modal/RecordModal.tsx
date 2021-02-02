import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Table, Pagination } from "react-bootstrap";
import { I_GlobalState, I_RecordModal, I_Record } from "../../../interfaces";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import { recordPaginationDataCount } from "../../../constant";
import { chunkArrayForPagination } from "../../../helper";
import _ from "lodash";
import moment from "moment";

const RecordModal = (props: I_RecordModal) => {
  const { selectedRecordData, modalTitle, isRecordModalOpen, setIsRecordModalOpen } = props;

  const [recordPagination, setRecordPagination] = useState<any>([]);
  const [recordCurrentPage, setRecordCurrentPage] = useState(0);

  useEffect(() => {
    if (isRecordModalOpen && selectedRecordData.length > 0) {
      console.log('dsasdasd')
      setRecordPagination(
        chunkArrayForPagination(
          selectedRecordData.slice(0).reverse(),
          recordPaginationDataCount
        )
      );
    }
  }, [selectedRecordData, isRecordModalOpen]);

  const renderRecord = (
    id: string,
    sender: string,
    delType: string,
    pud: string,
    month: string,
    year: string,
    jobNum: string,
    checkList: string,
    fileName: string,
    seqNum: number,
    cycleCode: string,
    qty: number,
    address: string,
    area: string,
    subsName: string,
    barCode: string,
    acctNum: string,
    dateRecieved: string,
    recievedBy: string,
    relation: string,
    messenger: string,
    status: string,
    reasonRTS: string,
    remarks: string,
    dateReported: string,
    index: number
  ) => {
    const itemNumber =
      recordCurrentPage * recordPaginationDataCount + (index + 1);
    return (
      <tr key={index}>
        <td>{itemNumber}</td>
        <td>{sender}</td>
        <td>{delType}</td>
        <td>{pud}</td>
        <td>{month}</td>
        <td>{year}</td>
        <td>{jobNum}</td>
        <td>{checkList}</td>
        <td>{fileName}</td>
        <td>{seqNum}</td>
        <td>{cycleCode}</td>
        <td>{qty}</td>
        <td>{address}</td>
        <td>{area}</td>
        <td>{subsName}</td>
        <td>{barCode}</td>
        <td>{acctNum}</td>
        <td>{dateRecieved}</td>
        <td>{recievedBy}</td>
        <td>{relation}</td>
        <td>{messenger}</td>
        <td>{status}</td>
        <td>{reasonRTS}</td>
        <td>{remarks}</td>
        <td>{moment(dateReported).format("MMM D, YYYY -  h:mm A")}</td>
        <td>Edit</td>
      </tr>
    );
  };

  return (
    <>
      <Modal
        show={isRecordModalOpen}
        onHide={() => setIsRecordModalOpen(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalTopAlert />
          <div style={{overflow: 'auto'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>SENDER</th>
                <th>DELTYPE</th>
                <th>PUD</th>
                <th>Month</th>
                <th>Job#</th>
                <th>Checklist For PPB</th>
                <th>File Name</th>
                <th>seq no.</th>
                <th>CYCLECODE</th>
                <th>Qty</th>
                <th>ADDRESS</th>
                <th>AREA</th>
                <th>SUBSCRIBERS NAME</th>
                <th>BARCODE</th>
                <th>ACCT NO</th>
                <th>DATE RECEIVED</th>
                <th>RECEIVED BY</th>
                <th>RELATION</th>
                <th>MESSENGER</th>
                <th>STATUS</th>
                <th>Reaseon for RTS</th>
                <th>Remarks</th>
                <th>Date Reported</th>
              </tr>
            </thead>
            <tbody>
              {isRecordModalOpen && recordPagination.length > 0
                ? recordPagination[recordCurrentPage].data.map(
                    (record: I_Record, index: number) => {
                      return renderRecord(
                        record._id,
                        record.sender,
                        record.delType,
                        record.pud,
                        record.month,
                        record.year,
                        record.jobNum,
                        record.checkList,
                        record.fileName,
                        record.seqNum,
                        record.cycleCode,
                        record.qty,
                        record.address,
                        record.area,
                        record.subsName,
                        record.barCode,
                        record.acctNum,
                        record.dateRecieved,
                        record.recievedBy,
                        record.relation,
                        record.messenger,
                        record.status,
                        record.reasonRTS,
                        record.remarks,
                        record.dateReported,
                        index
                      );
                    }
                  )
                : null}
            </tbody>
          </Table>
          </div>
          <Pagination style={{marginTop: '15px'}}>
            {recordCurrentPage > 0 ? (
              <>
                <Pagination.First onClick={() => setRecordCurrentPage(0)} />
                <Pagination.Prev
                  onClick={() => setRecordCurrentPage(recordCurrentPage - 1)}
                />
              </>
            ) : null}
            <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
              {recordCurrentPage + 1} of {recordPagination.length}
            </h3>
            {recordCurrentPage + 1 < recordPagination.length ? (
              <>
                <Pagination.Next
                  onClick={() => setRecordCurrentPage(recordCurrentPage + 1)}
                />
                <Pagination.Last
                  onClick={() =>
                    setRecordCurrentPage(recordPagination.length - 1)
                  }
                />
              </>
            ) : null}
          </Pagination>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsRecordModalOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({});

export default connect(mapStateToProps, {})(RecordModal);
