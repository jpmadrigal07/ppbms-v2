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
import { bulkDeleteRecord } from "../../../actions/recordActions";
import {
  getEncodeList,
  addLoadedPage,
} from "../../../actions/encodeListActions";
import { encodeListPaginationDataCount } from "../../../constant";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import RecordModal from "../modal/RecordModal";
import DeleteEncodeListModal from "../modal/DeleteEncodeListModal";
import _ from "lodash";
import moment from "moment";

const MasterListViewSecond = (props: I_MasterListViewProps) => {
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
    addLoadedPage,
    pageLoaded,
  } = props;

  const [encodeListPaginationCount, setEncodeListPaginationCount] = useState(0);
  const [encodeListPagination, setEncodeListPagination] = useState<any>([]);
  const [encodeListCurrentPage, setEncodeListCurrentPage] = useState(0);

  useEffect(() => {
    if (currentPage === "Master Lists" && encodeListData.length === 0) {
      const urlVariables = `?limit=${encodeListPaginationDataCount}`;
      getEncodeList(urlVariables);
      addLoadedPage(encodeListCurrentPage);
    }
  }, []);

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
          <span className="BasicLink">{unassignedCount}</span>
        </td>
        <td>{totalCount}</td>
        <td>
          <span className="BasicLink">View Record</span> |{" "}
          <span className="BasicLink">Delete</span>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    if(currentPage === "Master Lists" && encodeListData.length > 0) {
        const control =         chunkArrayForPagination(
            encodeListData.slice(0).reverse(),
            encodeListPagination,
            pageLoaded
          )
          console.log('hermetic', control)
      setEncodeListPagination(
        control
      );
    }
  }, [encodeListData]);

  useEffect(() => {

        console.log('beba', encodeListPagination)
    
  }, [encodeListPagination]);

  const chunkArrayForPagination = (
    updatedData: any,
    currentPaginationData: any,
    updatedPages: any
  ) => {
    console.log('gagae', updatedData)
    console.log('gagae', currentPaginationData)
    console.log('gagae', updatedPages)

    const newPageNumber = updatedPages.pop();
    const newData = [...currentPaginationData]
    newData.push({
        pageNumber: newPageNumber,
        data: updatedData
      });

      console.log('yeah', newData)
    return newData;
  };
  

  const alterPagination = (
    isAddition: boolean,
    isLastPage: boolean,
    value: number
  ) => {
    const add = encodeListCurrentPage + value;
    const subtract = encodeListCurrentPage - value;
    // setEncodeListCurrentPage(isAddition ? add : subtract);
    if (isAddition) {
      const actualPageNumber = add + 1;
      const pageLoaded = encodeListData.length / encodeListPaginationDataCount;
      const isPageLoaded = actualPageNumber === Math.ceil(pageLoaded);
      if (!isPageLoaded && !isLastPage) {
        const urlVariables = `?limit=${encodeListPaginationDataCount}&skip=${encodeListData.length}`;
        getEncodeList(urlVariables);
      }
    }
  };

  const renderEncodeListTable = () => {
    if (
      !isEncodeListLoading &&
      encodeListPagination.length > 0 &&
      !_.isNil(encodeListPagination[encodeListCurrentPage])
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
      isEncodeListLoading &&
      (encodeListPaginationCount === 0 || encodeListPaginationCount > 0)
    ) {
      return <Spinner animation="grow" />;
    } else if (!isEncodeListLoading && encodeListPaginationCount === 0) {
      return <h5 style={{ color: "gray" }}>No data found.</h5>;
    }
  };

  return <>{renderEncodeListTable()}</>;
};

const mapStateToProps = (gState: I_GlobalState) => ({
  encodeListData: gState.encodeList.data,
  recordData: gState.record.data,
  currentPage: gState.navBar.currentPage,
  isEncodeListLoading: gState.encodeList.isLoading,
  isRecordLoading: gState.record.isLoading,
  importedListCount: gState.dashboardCount.importedList,
  pageLoaded: gState.encodeList.pageLoaded,
});

export default connect(mapStateToProps, {
  getEncodeList,
  bulkDeleteRecord,
  triggerModalTopAlert,
  addLoadedPage,
})(MasterListViewSecond);
