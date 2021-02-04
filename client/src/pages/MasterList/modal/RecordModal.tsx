import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Table, Pagination, Form } from "react-bootstrap";
import { I_GlobalState, I_RecordModal, I_Record } from "../../../interfaces";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import { recordPaginationDataCount } from "../../../constant";
import { chunkArrayForPagination } from "../../../helper";
import _ from "lodash";
import moment from "moment";
import { recordFilterKeys } from "../../../constant";

const RecordModal = (props: I_RecordModal) => {
  const {
    selectedRecordData,
    modalTitle,
    isRecordModalOpen,
    setIsRecordModalOpen,
  } = props;

  const [recordPagination, setRecordPagination] = useState<any>([]);
  const [recordCurrentPage, setRecordCurrentPage] = useState(0);
  const [filterBy, setFilterBy] = useState("all");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [uniqueDelType, setUniqueDelType] = useState<any>([]);

  useEffect(() => {
    if (isRecordModalOpen && selectedRecordData.length > 0) {
      setRecordPagination(
        chunkArrayForPagination(
          selectedRecordData.slice(0).reverse(),
          recordPaginationDataCount
        )
      );
      setUniqueDelType(
        _.uniq(
          selectedRecordData.map((res) => {
            return res.delType;
          })
        )
      );
    }
  }, [selectedRecordData, isRecordModalOpen]);

  useEffect(() => {
    if (
      isRecordModalOpen &&
      selectedRecordData.length > 0 &&
      searchPhrase !== ""
    ) {
      const searchResult = searchSpecific(filterBy, searchPhrase);
      setRecordPagination(
        chunkArrayForPagination(
          searchResult.slice(0).reverse(),
          recordPaginationDataCount
        )
      );
    }
  }, [searchPhrase, filterBy]);

  const searchSpecific = (filter: string, value: string) => {
    if (filter === "all") {
      return selectedRecordData
        .map((res) => {
          const result = recordFilterKeys.map((resFilter) => {
            const isExist = res[resFilter]
              .toLowerCase()
              .includes(value.toLowerCase());
            return String(isExist);
          });
          return result.includes("true") ? res : null;
        })
        .filter((res) => !_.isNil(res));
    } else {
      return selectedRecordData
        .map((res) => {
          const result = res[filter]
            .toLowerCase()
            .includes(value.toLowerCase());
          return result ? res : null;
        })
        .filter((res) => !_.isNil(res));
    }
  };

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
          {isRecordModalOpen && recordPagination.length > 0 ? (
            <>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="all">Filter by All</option>
                  <option value="cycleCode">Filter by Cycle Code</option>
                  <option value="barCode">Filter by Barcode</option>
                  <option value="delType">Filter by Delivery Type</option>
                  <option value="sender">Filter by Sender (Company)</option>
                  <option value="subsName">Filter by Subscriber's Name</option>
                </Form.Control>
              </Form.Group>
              {filterBy !== "delType" ? (
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    type="text"
                    name="searchPhrase"
                    value={searchPhrase}
                    placeholder="Search Record"
                    onChange={(e) => setSearchPhrase(e.target.value)}
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    as="select"
                    onChange={(e) => setSearchPhrase(e.target.value)}
                  >
                    <option>-- Select Delivery Type --</option>
                    {uniqueDelType.map((res: string) => {
                      return <option>{res}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              )}
              <div style={{ overflow: "auto" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>SENDER</th>
                      <th>DELTYPE</th>
                      <th>PUD</th>
                      <th>Month</th>
                      <th>Year</th>
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
                      <th>Reason for RTS</th>
                      <th>Remarks</th>
                      <th>Date Reported</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordPagination[recordCurrentPage].data.map(
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
                    )}
                  </tbody>
                </Table>
              </div>
              <Pagination style={{ marginTop: "15px" }}>
                {recordCurrentPage > 0 ? (
                  <>
                    <Pagination.First onClick={() => setRecordCurrentPage(0)} />
                    <Pagination.Prev
                      onClick={() =>
                        setRecordCurrentPage(recordCurrentPage - 1)
                      }
                    />
                  </>
                ) : null}
                <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
                  {recordCurrentPage + 1} of {recordPagination.length}
                </h3>
                {recordCurrentPage + 1 < recordPagination.length ? (
                  <>
                    <Pagination.Next
                      onClick={() =>
                        setRecordCurrentPage(recordCurrentPage + 1)
                      }
                    />
                    <Pagination.Last
                      onClick={() =>
                        setRecordCurrentPage(recordPagination.length - 1)
                      }
                    />
                  </>
                ) : null}
              </Pagination>
            </>
          ) : (
            <h5 style={{ color: "gray" }}>No data...</h5>
          )}
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
