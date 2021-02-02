import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Spinner, Pagination } from "react-bootstrap";
import {
  I_MasterListViewProps,
  I_GlobalState,
  I_EncodeList,
  I_Record
} from "../../../interfaces";
import "../MasterList.scss";
import { chunkArrayForPagination } from "../../../helper";
import { encodeListPaginationDataCount } from "../../../constant";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import RecordModal from "../modal/RecordModal";
import _ from "lodash";
import moment from "moment";

const MasterListView = (props: I_MasterListViewProps) => {
  const { recordData, encodeListData, isEncodeListLoading } = props;

  const [encodeListPagination, setEncodeListPagination] = useState<any>([]);
  const [encodeListCurrentPage, setEncodeListCurrentPage] = useState(0);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedRecordData, setSelectedRecordData] = useState<I_Record[]>([]);
  const [modalTitle, setModalTitle] = useState("Record");

  useEffect(() => {
    setEncodeListPagination(
      chunkArrayForPagination(encodeListData.slice(0).reverse(), encodeListPaginationDataCount)
    );
  }, [encodeListData]);

  const renderEncodeLists = (
    id: string,
    fileName: string,
    dateImported: string,
    assignedCount: number,
    unassignedCount: number,
    totalCount: number,
    record: I_Record[],
    unAssigned: I_Record[],
    index: number
  ) => {
    const itemNumber = encodeListCurrentPage * encodeListPaginationDataCount + (index + 1);
    const modalTitleUnAssigned = `Unassigned records of ${fileName}`;
    const modalTitleRecord = `Records of ${fileName}`;
    return (
      <tr key={index}>
        <td>{itemNumber}</td>
        <td>{fileName}</td>
        <td>{moment(dateImported).format("MMM D, YYYY -  h:mm A")}</td>
        <td>{assignedCount}</td>
        <td><span className="BasicLink" onClick={() => showRecordModal(unAssigned, modalTitleUnAssigned)}>{unassignedCount}</span></td>
        <td>{totalCount}</td>
        <td><span className="BasicLink" onClick={() => showRecordModal(record, modalTitleRecord)}>View Record</span></td>
      </tr>
    );
  };

  const showRecordModal = (
    record: I_Record[],
    title: string
  ) => {
    triggerModalTopAlert(false, "", "")
    setSelectedRecordData(record);
    setIsRecordModalOpen(true);
    setModalTitle(title);
  };

  return (
    <>
      <Table striped bordered hover style={{ marginTop: "25px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Date Imported</th>
            <th>Assigned Count</th>
            <th>Unassigned Count</th>
            <th>Total Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isEncodeListLoading && encodeListPagination.length > 0 ? (
            encodeListPagination[encodeListCurrentPage].data.map(
              (encodeList: I_EncodeList, index: number) => {
                const record = recordData.filter(
                  (rec) => rec.encodeListId === encodeList._id
                );
                const assigned = record.filter(
                  (rec) =>
                    rec.encodeListId === encodeList._id &&
                    !_.isNil(rec.messengerId) &&
                    _.isNil(rec.deletedAt)
                );
                const unAssigned = record.filter(
                  (rec) =>
                    rec.encodeListId === encodeList._id &&
                    _.isNil(rec.messengerId) &&
                    _.isNil(rec.deletedAt)
                );
                return renderEncodeLists(
                  encodeList._id,
                  encodeList.fileName,
                  encodeList.createdAt,
                  assigned.length,
                  unAssigned.length,
                  record.length,
                  record,
                  unAssigned,
                  index
                );
              }
            )
          ) : (
            <Spinner style={{ marginTop: "35px" }} animation="grow" />
          )}
        </tbody>
      </Table>
      <Pagination>
        {encodeListCurrentPage > 0 ? (
          <>
            <Pagination.First onClick={() => setEncodeListCurrentPage(0)} />
            <Pagination.Prev
              onClick={() =>
                setEncodeListCurrentPage(encodeListCurrentPage - 1)
              }
            />
          </>
        ) : null}
        <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
          {encodeListCurrentPage + 1} of {encodeListPagination.length}
        </h3>
        {encodeListCurrentPage + 1 < encodeListPagination.length ? (
          <>
            <Pagination.Next
              onClick={() =>
                setEncodeListCurrentPage(encodeListCurrentPage + 1)
              }
            />
            <Pagination.Last
              onClick={() =>
                setEncodeListCurrentPage(encodeListPagination.length - 1)
              }
            />
          </>
        ) : null}
      </Pagination>
      <RecordModal
        selectedRecordData={selectedRecordData}
        isRecordModalOpen={isRecordModalOpen}
        modalTitle={modalTitle}
        setIsRecordModalOpen={(res: boolean) => setIsRecordModalOpen(res)}
      />
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  encodeListData: gState.encodeList.data,
  recordData: gState.record.data,
  isEncodeListLoading: gState.encodeList.isLoading,
});

export default connect(mapStateToProps, {})(MasterListView);
