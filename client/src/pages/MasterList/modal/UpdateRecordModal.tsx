import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { I_GlobalState, I_UpdateRecordModal } from "../../../interfaces";
import { updateRecord } from "../../../actions/recordActions";
import { triggerSecondModalTopAlert } from "../../../actions/secondModalTopAlertActions";
import SecondModalTopAlert from "../../../components/Alert/SecondModalTopAlert";
import moment from "moment";
import _ from "lodash";

const UpdateRecordModal = (props: I_UpdateRecordModal) => {
  const {
    selectedRecordId,
    isUpdateRecordModalOpen,
    triggerSecondModalTopAlert,
    setIsUpdateRecordModalOpen,
    isRecordUpdateLoading,
    recordData,
    updateRecord
  } = props;

  const [messengerId, setMessengerId] = useState("");
  const [encodeListId, setEncodeListId] = useState("");
  const [sender, setSender] = useState("");
  const [delType, setDelType] = useState("");
  const [pud, setPud] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [jobNum, setJobNum] = useState("");
  const [checkList, setCheckList] = useState("");
  const [fileName, setFileName] = useState("");
  const [seqNum, setSeqNum] = useState(0);
  const [cycleCode, setCycleCode] = useState("");
  const [qty, setQty] = useState(0);
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [subsName, setSubsName] = useState("");
  const [barCode, setBarCode] = useState("");
  const [acctNum, setAcctNum] = useState("");
  const [dateRecieved, setDateRecieved] = useState("");
  const [recievedBy, setRecievedBy] = useState("");
  const [relation, setRelation] = useState("");
  const [messenger, setMessenger] = useState("");
  const [status, setStatus] = useState("");
  const [reasonRTS, setReasonRTS] = useState("");
  const [remarks, setRemarks] = useState("");
  const [dateReported, setDateReported] = useState("");

  useEffect(() => {
    const record = recordData.find(
      (data) => data._id === selectedRecordId
    );
    if (!_.isNil(record)) {
      const {
        messengerId,
        encodeListId,
        sender,
        delType,
        pud,
        month,
        year,
        jobNum,
        checkList,
        fileName,
        seqNum,
        cycleCode,
        qty,
        address,
        area,
        subsName,
        barCode,
        acctNum,
        dateRecieved,
        recievedBy,
        relation,
        messenger,
        status,
        reasonRTS,
        remarks,
        dateReported
      } = record;

      setMessengerId(messengerId)
      setEncodeListId(encodeListId)
      setSender(sender)
      setDelType(delType)
      setPud(!_.isNil(dateRecieved) ? moment(pud).format('MM/DD/YYYY') : "")
      setMonth(month)
      setYear(year)
      setJobNum(jobNum)
      setCheckList(checkList)
      setFileName(fileName)
      setSeqNum(seqNum)
      setCycleCode(cycleCode)
      setQty(qty)
      setAddress(address)
      setArea(area)
      setSubsName(subsName)
      setBarCode(barCode)
      setAcctNum(acctNum)
      setDateRecieved(!_.isNil(dateRecieved) ? moment(dateRecieved).format('MM/DD/YYYY') : "")
      setRecievedBy(recievedBy)
      setRelation(relation)
      setMessenger(messenger)
      setStatus(status)
      setReasonRTS(reasonRTS)
      setRemarks(remarks)
      setDateReported(!_.isNil(dateReported) ? moment(dateReported).format('MM/DD/YYYY') : "")
    }
  }, [recordData, isUpdateRecordModalOpen]);

  const save = () => {
    if (
      sender === ""
    ) {
      triggerSecondModalTopAlert(true, "Please complete all the inputs", "warning");
    } else {
      updateRecord(selectedRecordId, {
        messengerId,
        encodeListId,
        sender,
        delType,
        pud,
        month,
        year,
        jobNum,
        checkList,
        fileName,
        seqNum,
        cycleCode,
        qty,
        address,
        area,
        subsName,
        barCode,
        acctNum,
        dateRecieved,
        recievedBy,
        relation,
        messenger,
        status,
        reasonRTS,
        remarks,
        dateReported
      })
    }
  };

  return (
    <Modal
      show={isUpdateRecordModalOpen}
      onHide={() => setIsUpdateRecordModalOpen(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SecondModalTopAlert />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Sender</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setSender(e.target.value)}
            value={sender}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Delivery Type</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setDelType(e.target.value)}
            value={delType}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>PUD (MM/DD/YYYY)</Form.Label>
          <Form.Control
            type="text"
            autoComplete="no"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setPud(e.target.value)}
            value={!_.isNil(pud) ? pud : ""}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Month</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setYear(e.target.value)}
            value={year}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Job Number</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setJobNum(e.target.value)}
            value={jobNum}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Check List</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setCheckList(e.target.value)}
            value={checkList}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>File Name</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setFileName(e.target.value)}
            value={fileName}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Sequence Number</Form.Label>
          <Form.Control
            type="number"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setSeqNum(parseInt(e.target.value))}
            value={seqNum}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Cycle Code</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setCycleCode(e.target.value)}
            value={cycleCode}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setQty(parseInt(e.target.value))}
            value={qty}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Area</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setArea(e.target.value)}
            value={area}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Subscriber Name</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setSubsName(e.target.value)}
            value={subsName}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setBarCode(e.target.value)}
            value={barCode}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setAcctNum(e.target.value)}
            value={acctNum}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date Recieved (MM/DD/YYYY)</Form.Label>
          <Form.Control
            type="text"
            autoComplete="no"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setDateRecieved(e.target.value)}
            value={!_.isNil(dateRecieved) ? dateRecieved : ""}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Recieved By</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setRecievedBy(e.target.value)}
            value={recievedBy}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Relation</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setRelation(e.target.value)}
            value={relation}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Messenger</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setMessenger(e.target.value)}
            value={messenger}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Reason RTS</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setReasonRTS(e.target.value)}
            value={reasonRTS}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            type="text"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setRemarks(e.target.value)}
            value={remarks}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date Reported (MM/DD/YYYY)</Form.Label>
          <Form.Control
            type="text"
            autoComplete="no"
            disabled={isRecordUpdateLoading}
            onChange={(e) => setDateReported(e.target.value)}
            value={!_.isNil(dateReported) ? dateReported : ""}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setIsUpdateRecordModalOpen(false)}
        >
          {isRecordUpdateLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Close"
          )}
        </Button>
        <Button variant="primary" onClick={() => save()}>
          {isRecordUpdateLoading ? (
            <Spinner animation="grow" variant="light" size="sm" />
          ) : (
            "Update"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  isRecordUpdateLoading: gState.record.isUpdateLoading,
  recordData: gState.record.data
});

export default connect(mapStateToProps, {
  updateRecord,
  triggerSecondModalTopAlert,
})(UpdateRecordModal);
