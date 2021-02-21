import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Spinner, Pagination, Form } from "react-bootstrap";
import {
  I_MasterListViewProps,
  I_GlobalState,
  I_EncodeList,
  I_Record,
} from "../../../interfaces";
import "../MasterList.scss";
import DatePicker from "react-datepicker";
import { bulkDeleteRecord } from "../../../actions/recordActions";
import { chunkArrayForPagination } from "../../../helper";
import { encodeListPaginationDataCount } from "../../../constant";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import RecordModal from "../modal/RecordModal";
import DeleteEncodeListModal from "../modal/DeleteEncodeListModal";
import _ from "lodash";
import moment from "moment";

const MasterListView = (props: I_MasterListViewProps) => {
  const {
    recordData,
    encodeListData,
    bulkDeleteRecord,
    isEncodeListLoading,
    triggerModalTopAlert,
    isRecordLoading,
  } = props;

  const [encodeListPagination, setEncodeListPagination] = useState<any>([]);
  const [encodeListCurrentPage, setEncodeListCurrentPage] = useState(0);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Record");
  const [selectedEncodeListId, setSelectedEncodeListId] = useState("");
  const [selectedEncodeListFileName, setSelectedEncodeListFileName] = useState(
    ""
  );
  const [
    isDeleteEncodeListModalOpen,
    setIsDeleteEncodeListModalOpen,
  ] = useState(false);
  const [listToShowRecord, setListToShowRecord] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setEncodeListPagination(
      chunkArrayForPagination(
        encodeListData.slice(0).reverse(),
        encodeListPaginationDataCount
      )
    );
    const recordEncodeListIds = _.uniq(
      recordData.map((res) => {
        return res.encodeListId;
      })
    );
    const encodeListIds = encodeListData.map((res) => {
      return res._id;
    });
    if (
      recordEncodeListIds.length !== encodeListIds.length &&
      !isRecordLoading
    ) {
      const deletedEncodeList = recordEncodeListIds.filter(function (val) {
        return encodeListIds.indexOf(val) == -1;
      });
      bulkDeleteRecord(deletedEncodeList);
    }
  }, [encodeListData, isRecordLoading]);

  useEffect(() => {
    setEncodeListCurrentPage(0);
    if (encodeListData.length > 0) {
      const searchResult = searchSpecific(searchPhrase);
      setEncodeListPagination(
        chunkArrayForPagination(
          searchResult.slice(0).reverse(),
          encodeListPaginationDataCount
        )
      );
    }
  }, [searchPhrase]);

  const searchSpecific = (value: string) => {
    return encodeListData
      .map((res) => {
        const createdAt = moment(res.createdAt).format("MM/DD/YYYY");
        const result = createdAt.includes(value);
        const isIncluded = result ? res : null;
        return value === "" ? res : isIncluded;
      })
      .filter((res) => !_.isNil(res));
  };

  const renderEncodeLists = (
    id: string,
    fileName: string,
    dateImported: string,
    assignedCount: number,
    unassignedCount: number,
    totalCount: number,
    index: number
  ) => {
    const itemNumber =
      encodeListCurrentPage * encodeListPaginationDataCount + (index + 1);
    const modalTitleUnAssigned = `Unassigned records of ${fileName}`;
    const modalTitleRecord = `Records of ${fileName}`;
    const showUnassignedRecord = "unassigned";
    const showAllRecords = "all";
    return (
      <tr key={index}>
        <td>{itemNumber}</td>
        <td>{fileName}</td>
        <td>{moment(dateImported).format("MMM D, YYYY -  h:mm A")}</td>
        <td>{assignedCount}</td>
        <td>
          <span
            className="BasicLink"
            onClick={() =>
              showRecordModal(id, showUnassignedRecord, modalTitleUnAssigned)
            }
          >
            {unassignedCount}
          </span>
        </td>
        <td>{totalCount}</td>
        <td>
          <span
            className="BasicLink"
            onClick={() =>
              showRecordModal(id, showAllRecords, modalTitleRecord)
            }
          >
            View Record
          </span>{" "}
          |{" "}
          <span
            className="BasicLink"
            onClick={() => deleteEncodeList(id, fileName)}
          >
            Delete
          </span>
        </td>
      </tr>
    );
  };

  const showRecordModal = (
    encodeListId: string,
    listToShow: string,
    title: string
  ) => {
    triggerModalTopAlert(false, "", "");
    setSelectedEncodeListId(encodeListId);
    setListToShowRecord(listToShow);
    setIsRecordModalOpen(true);
    setModalTitle(title);
  };

  const deleteEncodeList = (
    encodeListId: string,
    encodeListFileName: string
  ) => {
    triggerModalTopAlert(false, "", "");
    setSelectedEncodeListId(encodeListId);
    setSelectedEncodeListFileName(encodeListFileName);
    setIsDeleteEncodeListModalOpen(true);
  };

  const renderEncodeListTable = () => {
    if (!isEncodeListLoading && encodeListPagination.length > 0) {
      return (
        <>
          <Table striped bordered hover>
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
              {encodeListPagination[encodeListCurrentPage].data.map(
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
                    index
                  );
                }
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
        </>
      );
    } else if (isEncodeListLoading && (encodeListPagination.length === 0 || encodeListPagination.length > 0)) {
      return <Spinner animation="grow" />;
    } else if (!isEncodeListLoading && encodeListPagination.length === 0) {
      return <h5 style={{ color: "gray" }}>No data found.</h5>;
    }
  };

  return (
    <>
      <Form.Group controlId="searchEncodeList" style={{ marginTop: "25px" }}>
        <Form.Control
          className="form-control"
          placeholder="Search by Date Imported (MM/DD/YYYY)"
          disabled={isEncodeListLoading}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
      </Form.Group>
      {renderEncodeListTable()}
      <RecordModal
        selectedEncodeListId={selectedEncodeListId}
        isRecordModalOpen={isRecordModalOpen}
        modalTitle={modalTitle}
        listToShow={listToShowRecord}
        setIsRecordModalOpen={(res: boolean) => setIsRecordModalOpen(res)}
      />
      <DeleteEncodeListModal
        selectedEncodeListFileName={selectedEncodeListFileName}
        encodeListData={encodeListData}
        selectedEncodeListId={selectedEncodeListId}
        isDeleteEncodeListModalOpen={isDeleteEncodeListModalOpen}
        setIsDeleteEncodeListModalOpen={(res: boolean) =>
          setIsDeleteEncodeListModalOpen(res)
        }
      />
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  encodeListData: gState.encodeList.data,
  recordData: gState.record.data,
  isEncodeListLoading: gState.encodeList.isLoading,
  isRecordLoading: gState.record.isLoading,
});

export default connect(mapStateToProps, {
  bulkDeleteRecord,
  triggerModalTopAlert,
})(MasterListView);
