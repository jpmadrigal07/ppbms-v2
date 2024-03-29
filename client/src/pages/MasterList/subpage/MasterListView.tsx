import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Spinner, Pagination, Form } from "react-bootstrap";
import {
  I_MasterListViewProps,
  I_GlobalState,
  I_EncodeList,
} from "../../../interfaces";
import "../MasterList.scss";
import { bulkDeleteRecord } from "../../../actions/recordActions";
import { getEncodeList, setEncodeListLoadedPage } from "../../../actions/encodeListActions";
import {
  bigDataChunkArrayForPagination,
  chunkArrayForSearchPagination,
  chunkArray
} from "../../../helper";
import { encodeListPaginationDataCount } from "../../../constant";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import { getDashboardCount } from "../../../actions/dashboardCountActions";
import RecordModal from "../modal/RecordModal";
import DeleteEncodeListModal from "../modal/DeleteEncodeListModal";
import _ from "lodash";
import isNil from "lodash/isNil";
import moment from "moment";
import DatePicker from "react-datepicker";

const MasterListView = (props: I_MasterListViewProps) => {
  const {
    getDashboardCount,
    recordData,
    encodeListData,
    bulkDeleteRecord,
    isEncodeListLoading,
    triggerModalTopAlert,
    isRecordLoading,
    importedListCount,
    getEncodeList,
    currentPage,
    pageLoaded,
    gAuthData,
    setEncodeListLoadedPage,
    currentTab
  } = props;

  const [encodeListPaginationCount, setEncodeListPaginationCount] = useState(0);
  const [encodeListSearchPaginationCount, setEncodeListSearchPaginationCount] = useState(0);
  const [encodeListPagination, setEncodeListPagination] = useState<any>([]);
  const [
    encodeListSearchPagination,
    setEncodeListSearchPagination,
  ] = useState<any>([]);
  const [encodeListCurrentPage, setEncodeListCurrentPage] = useState(0);
  const [
    encodeListSearchCurrentPage,
    setEncodeListSearchCurrentPage,
  ] = useState(0);
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
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!_.isNil(gAuthData) && gAuthData !== "" && !_.isNil(gAuthData.role)) {
      if (importedListCount === 0) {
        getDashboardCount("importedList");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gAuthData]);

  useEffect(() => {
    if(currentTab === "view") {
      if(pageLoaded.length > 0) {
        const pageLoadedLoading = pageLoaded.includes(encodeListCurrentPage);
        if (
          currentPage === "Master Lists" &&
          encodeListData.length > 0 &&
          searchPhrase === "" &&
          !isEncodeListLoading &&
          pageLoadedLoading &&
          !isDeleteEncodeListModalOpen
        ) {
          const pagination = bigDataChunkArrayForPagination(
            encodeListData,
            encodeListPagination,
            pageLoaded.slice(-1).pop(),
            encodeListCurrentPage,
            pageLoaded.findIndex((res: number) => res === encodeListCurrentPage),
            encodeListPaginationDataCount,
          );
          setEncodeListPagination(pagination);
        } else if (
          currentPage === "Master Lists" &&
          encodeListData.length > 0 &&
          searchPhrase !== "" &&
          !isEncodeListLoading
        ) {
          setEncodeListSearchPagination(
            chunkArrayForSearchPagination(
              encodeListData,
              encodeListPaginationDataCount,
              searchPhrase
            )
          );
        }
        if(isDeleteEncodeListModalOpen) {
          const figure = chunkArray(
            encodeListData,
            encodeListPaginationDataCount,
            pageLoaded
          );
          setEncodeListPagination(
            figure
          );
        }
      }
    } else {
      if(encodeListCurrentPage !== 0) {
        setEncodeListCurrentPage(0)
      }
      if(pageLoaded.length > 1) {
        setEncodeListLoadedPage([0])
      }
      const figure = chunkArray(
        encodeListData,
        encodeListPaginationDataCount,
        pageLoaded
      )
      setEncodeListPagination(
        figure
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodeListData, pageLoaded, encodeListCurrentPage, isEncodeListLoading]);

  useEffect(() => {
    // This variable is the query variables that is being pass to the api for condition
    if (currentPage === "Master Lists" && encodeListData.length === 0 && importedListCount > 0 && currentTab === "view") {
      const toSkip = importedListCount-encodeListPaginationDataCount;
      const urlVariables = `?limit=${encodeListPaginationDataCount}&skip=${toSkip}`;
      const newPageNumber = 0;
      getEncodeList(urlVariables, newPageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, importedListCount]);

  useEffect(() => {
    if (importedListCount) {
      setEncodeListPaginationCount(
        Math.ceil(importedListCount / encodeListPaginationDataCount)
      );
    }
  }, [importedListCount]);

  useEffect(() => {
    if (encodeListSearchPagination.length > 0) {
      setEncodeListSearchPaginationCount(
        Math.ceil(encodeListSearchPagination.length)
      );
    }
  }, [encodeListSearchPagination]);

  useEffect(() => {
    if(encodeListData.length > 0 && importedListCount > 0 && encodeListPagination.length > 0 && isDeleteEncodeListModalOpen) {
      const chunkCounts = encodeListPagination.map((res: any) => {
        return Array.isArray(res.data) ? res!.data.length : 0;
      })
      const currentPaginationItemCount = chunkCounts.reduce(function(a: number, b: number) { return a + b; }, 0);
      const isRecordRecordDeleted = currentPaginationItemCount > encodeListData.length
      if(isRecordRecordDeleted) {
        const isAllRecordLoaded = currentPaginationItemCount === importedListCount
        if(!isAllRecordLoaded) {
          const toFetchCount = currentPaginationItemCount - encodeListData.length;
          const toSkip = currentPaginationItemCount-1;
          const urlVariables = `?limit=${toFetchCount}&skip=${toSkip}`;
          getEncodeList(urlVariables);
        }
      }
    }
    if(pageLoaded.length > 0 && encodeListPagination.length > 0) {
      if(pageLoaded.length > encodeListPagination.length) {
        const messengerListPaginationArrLength = encodeListPagination.length-1;
        const pageLoadedNew = pageLoaded.map((res: number, index: number) => {
          return messengerListPaginationArrLength >= index ? res : undefined
        }).filter((res: any) => !isNil(res));
        if(pageLoaded.length - 1 === encodeListCurrentPage) {
          setEncodeListCurrentPage(messengerListPaginationArrLength)
        }
        setEncodeListLoadedPage(pageLoadedNew);
        const newPaginationMaxCount = encodeListPaginationCount - (pageLoaded.length - encodeListPagination.length) 
        setEncodeListPaginationCount(
          newPaginationMaxCount
        );
      }
    }
  }, [encodeListData, encodeListPagination, importedListCount])

  useEffect(() => {
    if (
      encodeListData.length > 0 &&
      searchPhrase !== "" &&
      searchPhrase.length === 10
    ) {
      setEncodeListCurrentPage(0);
      const loadedEncodeListsIds = encodeListData.map(
        (res: I_EncodeList) => res._id
      );
      const dateSearch = moment(searchPhrase).format("YYYY-MM-DDTHH:mm:ss[Z]");
      const dateSearchNextDay = moment(searchPhrase)
        .add(1, "days")
        .format("YYYY-MM-DDTHH:mm:ss[Z]");
      const condition = `{"createdAt": {"$gte": "${dateSearch}", "$lt": "${dateSearchNextDay}"}, "_id": { "$nin": ${JSON.stringify(
        loadedEncodeListsIds
      )} } }`;
      const urlVariables = `?limit=0&condition=${encodeURIComponent(
        condition
      )}`;
      const newPageNumber = undefined;
      getEncodeList(urlVariables, newPageNumber);
    } else {
      setEncodeListSearchCurrentPage(0);
      setEncodeListSearchPagination([]);
    }
  }, [searchPhrase]);

  const alterPagination = (
    isAddition: boolean,
    isLastPage: boolean,
    value: number
  ) => {
    if (!isLastPage) {
      const add = encodeListCurrentPage + value;
      const subtract = encodeListCurrentPage - value;
      const alterPageNumberBy = isAddition ? add : subtract;
      setEncodeListCurrentPage(alterPageNumberBy);

      const actualPageNumber = alterPageNumberBy;
      const isPageLoaded = pageLoaded.includes(actualPageNumber);
      if (!isPageLoaded) {
        const toSkip = importedListCount - ((actualPageNumber+1) * encodeListPaginationDataCount);
        const urlVariables = `?limit=${encodeListPaginationDataCount}&skip=${toSkip < 0 ? 0 : toSkip}`;
        getEncodeList(urlVariables, actualPageNumber, toSkip);
      }
    } else {
      setEncodeListCurrentPage(value);
      const isPageLoaded = pageLoaded.includes(value);
      if (!isPageLoaded) {
        const remainder = importedListCount % encodeListPaginationDataCount;
        const limit = remainder === 0 ? encodeListPaginationDataCount : remainder;
        const urlVariables = `?limit=${limit}&skip=0`;
        getEncodeList(urlVariables, value);
      }
    }
  };

  const alterSearchPagination = (
    isAddition: boolean,
    isLastPage: boolean,
    value: number
  ) => {
    if (!isLastPage) {
      const add = encodeListSearchCurrentPage + value;
      const subtract = encodeListSearchCurrentPage - value;
      const alterPageNumberBy = isAddition ? add : subtract;
      setEncodeListSearchCurrentPage(alterPageNumberBy);
    } else {
      setEncodeListSearchCurrentPage(value);
    }
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
    const itemNumber = searchPhrase === "" ?
      encodeListCurrentPage * encodeListPaginationDataCount + (index + 1) : 
        encodeListSearchCurrentPage * encodeListPaginationDataCount + (index + 1);
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
            onClick={() => window.open(`/masterlistsreceipt?encodelistid=${id}`, "_blank")}
          >
            Print Receipt
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
    const isPageExist =
      encodeListPagination.filter((pagination: any) => {
        return pagination.pageNumber === encodeListCurrentPage;
      }).length > 0;

    const isSearchPageExist =
      encodeListSearchPagination.filter((pagination: any) => {
        return pagination.pageNumber === encodeListSearchCurrentPage;
      }).length > 0;

    if (
      !isEncodeListLoading &&
      encodeListPagination.length > 0 &&
      isPageExist &&
      searchPhrase === "" &&
      searchPhrase.length === 0
    ) {
      const pageIndex = encodeListPagination.findIndex(
        (pagination: any) => pagination.pageNumber === encodeListCurrentPage
      );
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
                  onClick={() => alterPagination(false, false, 1)}
                />
              </>
            ) : null}
            <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
              {encodeListCurrentPage + 1} of {encodeListPaginationCount}
            </h3>
            {encodeListCurrentPage + 1 < encodeListPaginationCount ? (
              <>
                <Pagination.Next
                  onClick={() => alterPagination(true, false, 1)}
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
    } else if (
      !isEncodeListLoading &&
      encodeListSearchPagination.length > 0 &&
      isSearchPageExist &&
      searchPhrase !== "" &&
      searchPhrase.length > 9
    ) {
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
            {encodeListSearchCurrentPage > 0 ? (
              <>
                <Pagination.First onClick={() => setEncodeListSearchCurrentPage(0)} />
                <Pagination.Prev
                  onClick={() => alterSearchPagination(false, false, 1)}
                />
              </>
            ) : null}
            <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
              {encodeListSearchCurrentPage + 1} of {encodeListSearchPaginationCount}
            </h3>
            {encodeListSearchCurrentPage + 1 < encodeListSearchPaginationCount ? (
              <>
                <Pagination.Next
                  onClick={() => alterSearchPagination(true, false, 1)}
                />
                <Pagination.Last
                  onClick={() =>
                    alterSearchPagination(true, true, encodeListSearchPaginationCount - 1)
                  }
                />
              </>
            ) : null}
          </Pagination>
        </>
      );
    } else if (
      (isEncodeListLoading &&
        (encodeListPaginationCount === 0 || encodeListPaginationCount > 0)) ||
      (searchPhrase.length > 0 && searchPhrase.length < 10)
    ) {
      return <span style={{display: 'flex', justifyContent: 'center'}}><Spinner animation="grow"/></span>;
    } else if (
      !isEncodeListLoading ||
      encodeListPagination.length > 0 ||
      !isEncodeListLoading ||
      encodeListSearchPagination.length > 0
    ) {
      return <h5 style={{ color: "gray", textAlign: 'center' }}>No data found.</h5>;
    }
  };

  return (
    <>
      <Form.Group controlId="searchEncodeList" style={{ marginTop: "25px" }}>
        <DatePicker
          id="formBasicPassword"
          className="form-control"
          placeholderText="Search by Date Imported (MM/DD/YYYY)"
          autoComplete="off"
          selected={date}
          onChange={(dateVal: Date) => {
            if(dateVal) {
              const dateSelected = moment(new Date(dateVal.toString())).format("MM/DD/YYYY");
              setSearchPhrase(dateSelected);
              setDate(dateVal);
            }
          }}
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
  gAuthData: gState.auth.user,
  encodeListData: gState.encodeList.data,
  currentPage: gState.navBar.currentPage,
  recordData: gState.record.data,
  isEncodeListLoading: gState.encodeList.isLoading,
  isRecordLoading: gState.record.isLoading,
  importedListCount: gState.dashboardCount.importedList,
  pageLoaded: gState.encodeList.pageLoaded,
});

export default connect(mapStateToProps, {
  getDashboardCount,
  getEncodeList,
  bulkDeleteRecord,
  triggerModalTopAlert,
  setEncodeListLoadedPage
})(MasterListView);
