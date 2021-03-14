import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Table, Pagination, Form } from "react-bootstrap";
import { I_GlobalState, I_RecordModal, I_Record } from "../../../interfaces";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import { recordPaginationDataCount } from "../../../constant";
import { chunkArrayForPagination } from "../../../helper";
import UpdateRecordModal from "../modal/UpdateRecordModal";
import DeleteRecordModal from "../modal/DeleteRecordModal";
import _ from "lodash";
import moment from "moment";
import { recordFilterKeys } from "../../../constant";

const RecordModal = (props: I_RecordModal) => {
  const {
    selectedEncodeListId,
    modalTitle,
    isRecordModalOpen,
    setIsRecordModalOpen,
    triggerModalTopAlert,
    listToShow,
    recordData,
  } = props;

  const [selectedRecordData, setSelectedRecordData] = useState<I_Record[]>([]);
  const [recordPagination, setRecordPagination] = useState<any>([]);
  const [recordCurrentPage, setRecordCurrentPage] = useState(0);
  const [filterBy, setFilterBy] = useState("all");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [uniqueDelType, setUniqueDelType] = useState<any>([]);
  const [selectedRecordId, setSelectedRecordId] = useState("");
  const [selectedRecordSubsName, setSelectedRecordSubsName] = useState("");
  const [isDeleteRecordModalOpen, setIsDeleteRecordModalOpen] = useState(false);
  const [isUpdateRecordModalOpen, setIsUpdateRecordModalOpen] = useState(false);

  useEffect(() => {
    if (recordData.length > 0) {
      if (listToShow === "all") {
        setSelectedRecordData(
          recordData.filter((res) => res.encodeListId === selectedEncodeListId)
        );
      } else if (listToShow === "unassigned") {
        setSelectedRecordData(
          recordData.filter(
            (res) =>
              res.encodeListId === selectedEncodeListId &&
              _.isNil(res.messengerId)
          )
        );
      }
    }
  }, [recordData, isRecordModalOpen]);

  useEffect(() => {
    if (
      isRecordModalOpen &&
      selectedRecordData.length > 0 &&
      searchPhrase === ""
    ) {
      // setRecordPagination(
      //   chunkArrayForPagination(
      //     selectedRecordData.slice(0).reverse(),
      //     recordPaginationDataCount
      //   )
      // );
      setUniqueDelType(
        _.uniq(
          selectedRecordData.map((res) => {
            return res.delType;
          })
        )
      );
    } else {
      searchPagination();
    }
  }, [selectedRecordData, isRecordModalOpen]);

  useEffect(() => {
    setRecordCurrentPage(0);
    searchPagination();
  }, [searchPhrase, filterBy]);

  const searchPagination = () => {
    if (isRecordModalOpen && selectedRecordData.length > 0) {
      const searchResult = searchSpecific(filterBy, searchPhrase);
      // setRecordPagination(
      //   chunkArrayForPagination(
      //     searchResult.slice(0).reverse(),
      //     recordPaginationDataCount
      //   )
      // );
    }
  };

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
          const isIncluded = result.includes("true") ? res : null;
          return value === "" ? res : isIncluded;
        })
        .filter((res) => !_.isNil(res));
    } else {
      return selectedRecordData
        .map((res) => {
          const result = res[filter]
            .toLowerCase()
            .includes(value.toLowerCase());
          const isIncluded = result ? res : null;
          return value === "" ? res : isIncluded;
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
    const dateRecievedFormatted = !_.isNil(dateRecieved)
      ? moment(dateRecieved).format("MM/DD/YYYY")
      : "";
    const dateReportedFormatted = !_.isNil(dateReported)
      ? moment(dateReported).format("MM/DD/YYYY")
      : "";
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
        <td>{dateRecievedFormatted}</td>
        <td>{recievedBy}</td>
        <td>{relation}</td>
        <td>{messenger}</td>
        <td>{status}</td>
        <td>{reasonRTS}</td>
        <td>{remarks}</td>
        <td>{dateReportedFormatted}</td>
        <td>
          <span
            onClick={() => updateRecord(id)}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
          Edit
          </span>{" "}|{" "}
          <span
            onClick={() => deleteRecord(id, subsName)}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            Delete
          </span>
        </td>
      </tr>
    );
  };

  const updateRecord = (recordId: string) => {
    triggerModalTopAlert(false, "", "");
    setSelectedRecordId(recordId);
    setIsUpdateRecordModalOpen(true);
  };

  const deleteRecord = (recordId: string, recordSubsName: string) => {
    triggerModalTopAlert(false, "", "");
    setSelectedRecordId(recordId);
    setSelectedRecordSubsName(recordSubsName);
    setIsDeleteRecordModalOpen(true);
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
          {isRecordModalOpen && recordPagination.length > 0 ? (
            <>
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
            <h5 style={{ color: "gray" }}>No data found.</h5>
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
      <UpdateRecordModal
        selectedRecordId={selectedRecordId}
        isUpdateRecordModalOpen={isUpdateRecordModalOpen}
        setIsUpdateRecordModalOpen={(res: boolean) =>
          setIsUpdateRecordModalOpen(res)
        }
      />
      <DeleteRecordModal
        selectedRecordSubsName={selectedRecordSubsName}
        selectedRecordId={selectedRecordId}
        isDeleteRecordModalOpen={isDeleteRecordModalOpen}
        setIsDeleteRecordModalOpen={(res: boolean) =>
          setIsDeleteRecordModalOpen(res)
        }
      />
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  recordData: gState.record.data,
});

export default connect(mapStateToProps, { triggerModalTopAlert })(RecordModal);
