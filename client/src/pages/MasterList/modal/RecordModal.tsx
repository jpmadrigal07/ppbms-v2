import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Table, Pagination, Form, Spinner } from "react-bootstrap";
import { I_GlobalState, I_RecordModal, I_Record } from "../../../interfaces";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import { getRecord } from "../../../actions/recordActions";
import ModalTopAlert from "../../../components/Alert/ModalTopAlert";
import { recordPaginationDataCount } from "../../../constant";
import { smallDataChunkArrayForPagination } from "../../../helper";
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
    isRecordDataLoading,
    getRecord,
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
    const isRecordsExist = recordData.find((res) => res.encodeListId === selectedEncodeListId);
    if (isRecordModalOpen && !_.isNil(selectedEncodeListId) && _.isNil(isRecordsExist)) {
      const condition = `{"encodeListId": "${selectedEncodeListId}"}`;
      const urlVariables = `?condition=${encodeURIComponent(condition)}`;
      getRecord(urlVariables);
    } else {
      setRecordPagination([])
    }
  }, [isRecordModalOpen]);

  useEffect(() => {
    if (recordData.length > 0 && !isRecordDataLoading) {
      setSelectedRecordData(
        recordData.filter((res) => res.encodeListId === selectedEncodeListId)
      );
    }
  }, [recordData]);

  useEffect(() => {
    if (
      isRecordModalOpen &&
      selectedRecordData.length > 0 &&
      !isRecordDataLoading &&
      searchPhrase === ""
    ) {
      const reversedSelectedRecordData = selectedRecordData.slice(0).reverse();
      const recordDataUnAssigned = reversedSelectedRecordData.map((res) => {
        return _.isNil(res.messengerId) && _.isNil(res.deletedAt) ? res : null
      }).filter((res) => !_.isNil(res))
      const recordDataPagination = listToShow === "all" ? reversedSelectedRecordData : recordDataUnAssigned;
      setRecordPagination(
        smallDataChunkArrayForPagination(
          recordDataPagination,
          recordPaginationDataCount
        )
      );
      setUniqueDelType(
        _.uniq(
          recordDataPagination.map((res) => {
            return res!.delType;
          })
        )
      );
    } else {
      searchPagination();
    }
  }, [selectedRecordData, isRecordModalOpen]);

  // HINDI PA AYOS ANG VIEW RECORD PAG OPEN AT CLOSE MO TYAKA PAG CHECK NG IBANG VIEW RECORD

  useEffect(() => {
    setRecordCurrentPage(0);
    searchPagination();
  }, [searchPhrase, filterBy]);

  const searchPagination = () => {
    if (isRecordModalOpen && selectedRecordData.length > 0) {
      const searchResult = searchSpecific(filterBy, searchPhrase);
      setRecordPagination(
        smallDataChunkArrayForPagination(
          searchResult.slice(0).reverse(),
          recordPaginationDataCount
        )
      );
    }
  };

  const searchSpecific = (filter: string, value: string) => {
    const reversedSelectedRecordData = selectedRecordData.slice(0).reverse();
    const recordDataUnAssigned = reversedSelectedRecordData.map((res) => {
      return _.isNil(res.messengerId) && _.isNil(res.deletedAt) ? res : null
    }).filter((res) => !_.isNil(res))
    const recordDataSearch = listToShow === "all" ? reversedSelectedRecordData : recordDataUnAssigned;
    if (filter === "all") {
      return recordDataSearch
        .map((res) => {
          const result = recordFilterKeys.map((resFilter) => {
            const isExist = res![resFilter]
              .toLowerCase()
              .includes(value.toLowerCase());
            return String(isExist);
          });
          const isIncluded = result.includes("true") ? res : null;
          return value === "" ? res : isIncluded;
        })
        .filter((res) => !_.isNil(res));
    } else {
      return recordDataSearch
        .map((res) => {
          const result = res![filter]
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
        <td className="Truncate">{address}</td>
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
          </span>{" "}
          |{" "}
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

  const renderRecordTable = () => {
    if(isRecordModalOpen && recordPagination.length > 0 && !isRecordDataLoading) {
      return <>
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
    } else if(isRecordModalOpen && isRecordDataLoading) {
      return <Spinner animation="grow" />
    } else {
      return <h5 style={{ color: "gray" }}>No data found.</h5>
    }
  }

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
        className="SampleClass"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalTopAlert />

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              disabled={isRecordDataLoading}
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
                disabled={isRecordDataLoading}
                onChange={(e) => setSearchPhrase(e.target.value)}
              />
            </Form.Group>
          ) : (
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control
                as="select"
                onChange={(e) => setSearchPhrase(e.target.value)}
                disabled={isRecordDataLoading}
              >
                <option>-- Select Delivery Type --</option>
                {uniqueDelType.map((res: string) => {
                  return <option>{res}</option>;
                })}
              </Form.Control>
            </Form.Group>
          )}
          {renderRecordTable()}
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
  isRecordDataLoading: gState.record.isLoading
});

export default connect(mapStateToProps, { triggerModalTopAlert, getRecord })(
  RecordModal
);
