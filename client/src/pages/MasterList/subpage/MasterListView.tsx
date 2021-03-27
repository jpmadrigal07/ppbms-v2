import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Spinner, Pagination, Form } from "react-bootstrap";
import {
  I_MasterListViewProps,
  I_GlobalState,
  I_EncodeList
} from "../../../interfaces";
import "../MasterList.scss";
import { bulkDeleteRecord } from "../../../actions/recordActions";
import { getEncodeList } from "../../../actions/encodeListActions";
import { chunkArrayForPagination, chunkArrayForSearchPagination } from "../../../helper";
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
    importedListCount,
    getEncodeList,
    currentPage,
    pageLoaded
  } = props;

  const [encodeListPaginationCount, setEncodeListPaginationCount] = useState(0);
  const [encodeListPagination, setEncodeListPagination] = useState<any>([]);
  const [encodeListSearchPagination, setEncodeListSearchPagination] = useState<any>([]);
  const [encodeListCurrentPage, setEncodeListCurrentPage] = useState(0);
  const [encodeListSearchCurrentPage, setEncodeListSearchCurrentPage] = useState(0);
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
    const recordEncodeListIds = _.uniq(
      recordData.map((res) => {
        return res.encodeListId;
      })
    );
    const encodeListIds = encodeListData.map((res) => {
      return res._id;
    });
    if (recordEncodeListIds.length > encodeListIds.length && !isRecordLoading) {
      const deletedEncodeList = recordEncodeListIds.filter(function (val) {
        return encodeListIds.indexOf(val) == -1;
      });
      bulkDeleteRecord(deletedEncodeList);
    }
  }, [encodeListData, isRecordLoading]);

  useEffect(() => {
    const pageLoadedLoading = pageLoaded.includes(encodeListCurrentPage)
    if(currentPage === "Master Lists" && encodeListData.length > 0 && searchPhrase === "" && !isEncodeListLoading && pageLoadedLoading) {
      const bebebe = chunkArrayForPagination(
        encodeListData,
        encodeListPagination,
        pageLoaded.slice(-1).pop(),
        encodeListCurrentPage,
        pageLoaded.findIndex((res: number) => res === encodeListCurrentPage)
      );
      setEncodeListPagination(
        bebebe
      );
    } else if(currentPage === "Master Lists" && encodeListData.length > 0 && searchPhrase !== "" && !isEncodeListLoading) {
      setEncodeListSearchPagination(
        chunkArrayForSearchPagination(
          encodeListData,
          encodeListPaginationDataCount,
          searchPhrase
        )
      );
    }
  }, [encodeListData, pageLoaded]);

  useEffect(() => {
    // This variable is the query variables that is being pass to the api for condition
    if(currentPage === "Master Lists" && encodeListData.length === 0) {
      const urlVariables = `?limit=${encodeListPaginationDataCount}`;
      const newPageNumber = 0;
      getEncodeList(urlVariables, newPageNumber);
    }
  }, [currentPage]);

  useEffect(() => {
    const paginationCount =
      importedListCount > 0 && importedListCount < 10
        ? 1
        : importedListCount > 0 && importedListCount > 10
        ? importedListCount / encodeListPaginationDataCount
        : 0;
    setEncodeListPaginationCount(Math.ceil(paginationCount));
  }, [importedListCount]);

  useEffect(() => {
    setEncodeListCurrentPage(0);
    if (encodeListData.length > 0 && searchPhrase !== "" && searchPhrase.length === 10) {
      const loadedEncodeListsIds = encodeListData.map((res: I_EncodeList) => res._id);
      const dateSearch = moment(searchPhrase).format('YYYY-MM-DDTHH:mm:ss[Z]');
      const dateSearchNextDay = moment(searchPhrase).add(1, 'days').format('YYYY-MM-DDTHH:mm:ss[Z]');
      const condition = `{"createdAt": {"$gte": "${dateSearch}", "$lt": "${dateSearchNextDay}"}, "_id": { "$nin": ${JSON.stringify(loadedEncodeListsIds)} } }`
      const urlVariables = `?limit=0&condition=${encodeURIComponent(condition)}`
      const newPageNumber = undefined;
      getEncodeList(urlVariables, newPageNumber);
    }
  }, [searchPhrase]);

  const alterPagination = (isAddition: boolean, isLastPage: boolean, value: number) => {
    if(!isLastPage) {
      const add = encodeListCurrentPage + value;
      const subtract = encodeListCurrentPage - value;
      const alterPageNumberBy = isAddition ? add : subtract;
      setEncodeListCurrentPage(alterPageNumberBy);

      const actualPageNumber = alterPageNumberBy;
      const isPageLoaded = pageLoaded.includes(actualPageNumber);
      // MALI TONG TO SKIP PLEASE FIX THIS KAILANGAN I CONSIDER AND SUBTRACTION OF PAGE
      const toSkip = actualPageNumber*encodeListPaginationDataCount;
      console.log('feel', toSkip)
      if(!isPageLoaded) {
        const urlVariables = `?limit=${encodeListPaginationDataCount}&skip=${toSkip}`;
        const newPageNumber = actualPageNumber;
        getEncodeList(urlVariables, newPageNumber, toSkip);
      }
    } else {
      setEncodeListCurrentPage(value);
      const isPageLoaded = pageLoaded.includes(value);
      if(!isPageLoaded) {
        const remainder = importedListCount % encodeListPaginationDataCount;
        const toSkip = importedListCount - remainder;
        const limit = remainder === 0 ? encodeListPaginationDataCount : remainder;
        const urlVariables = `?limit=${limit}&skip=${toSkip}`;
        const newPageNumber = value;
        getEncodeList(urlVariables, newPageNumber, toSkip);
      }
    }
  }

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
    const isPageExist = encodeListPagination.filter((pagination: any) => {
      return pagination.pageNumber === encodeListCurrentPage;
    }).length > 0;

    const isSearchPageExist = encodeListSearchPagination.filter((pagination: any) => {
      return pagination.pageNumber === encodeListSearchCurrentPage;
    }).length > 0;

    if (!isEncodeListLoading && encodeListPagination.length > 0 && isPageExist && searchPhrase === "" && searchPhrase.length === 0) {
      const pageIndex = encodeListPagination.findIndex((pagination: any) => pagination.pageNumber === encodeListCurrentPage);
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
              {encodeListPagination[pageIndex].data.map(
                (encodeList: I_EncodeList, index: number) => {
                  return renderEncodeLists(
                    encodeList._id,
                    encodeList.fileName,
                    encodeList.createdAt,
                    encodeList.assignedRecordCount,
                    encodeList.unAssignedRecordCount,
                    encodeList.recordCount,
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
                    alterPagination(false, false, 1)
                  }
                />
              </>
            ) : null}
            <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
              {encodeListCurrentPage + 1} of {encodeListPaginationCount}
            </h3>
            {encodeListCurrentPage + 1 < encodeListPaginationCount ? (
              <>
                <Pagination.Next
                  onClick={() =>
                    alterPagination(true, false, 1)
                  }
                />
                <Pagination.Last
                  onClick={() =>
                    alterPagination(true, true, encodeListPaginationCount - 1)
                  }
                />
              </>
            ) : null}
          </Pagination>
        </>
      );
    } else if (!isEncodeListLoading && encodeListSearchPagination.length > 0 && isSearchPageExist && searchPhrase !== "" && searchPhrase.length > 9) {
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
              {encodeListSearchPagination[encodeListSearchCurrentPage].data.map(
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
            {encodeListSearchCurrentPage > 0 ? (
              <>
                <Pagination.First onClick={() => setEncodeListSearchCurrentPage(0)} />
                <Pagination.Prev
                  // onClick={() =>
                    // alterPagination(false, false, 1)
                  // }
                />
              </>
            ) : null}
            <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
              {encodeListSearchCurrentPage + 1} of {encodeListSearchPagination.length}
            </h3>
            {encodeListSearchCurrentPage + 1 < encodeListSearchPagination.length ? (
              <>
                <Pagination.Next
                  // onClick={() =>
                    // alterPagination(true, false, 1)
                  // }
                />
                <Pagination.Last
                  // onClick={() =>
                    // alterPagination(true, true, encodeListSearchPagination.length - 1)
                  // }
                />
              </>
            ) : null}
          </Pagination>
        </>
      );
    } else if (
      (isEncodeListLoading &&
      (encodeListPaginationCount === 0 || encodeListPaginationCount > 0)) || (searchPhrase.length > 0 && searchPhrase.length < 10)
    ) {
      return <Spinner animation="grow" />;
    } else if ((!isEncodeListLoading || encodeListPagination.length > 0) || (!isEncodeListLoading|| encodeListSearchPagination.length > 0)) {
      return <h5 style={{ color: "gray" }}>No data found.</h5>;
    }
  };

  return (
    <>
      <Form.Group controlId="searchEncodeList" style={{ marginTop: "25px" }}>
        <Form.Control
          className="form-control"
          placeholder="Search by Date Imported (MM/DD/YYYY)"
          autoComplete="off"
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
  currentPage: gState.navBar.currentPage,
  recordData: gState.record.data,
  isEncodeListLoading: gState.encodeList.isLoading,
  isRecordLoading: gState.record.isLoading,
  importedListCount: gState.dashboardCount.importedList,
  pageLoaded: gState.encodeList.pageLoaded
});

export default connect(mapStateToProps, {
  getEncodeList,
  bulkDeleteRecord,
  triggerModalTopAlert
})(MasterListView);
