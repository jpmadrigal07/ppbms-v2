import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import { Table, Spinner, Pagination, Form } from "react-bootstrap";
import {
  I_MessengerListViewProps,
  I_GlobalState,
  I_DispatchControlMessenger,
} from "../../../interfaces";
import moment from "moment";
import { getDispatchControlMessengers, setDispatchControlMessengerLoadedPage } from "../../../actions/dispatchControlMessengerActions";
import { encodeListPaginationDataCount } from "../../../constant";
import { getDashboardCount } from "../../../actions/dashboardCountActions";
import DeleteMessengerModal from "../modal/DeleteMessengerModal";
import {
  bigDataChunkArrayForPagination,
  chunkArrayForSearchPaginationDispatch,
  chunkArray
} from "../../../helper";
import isNil from "lodash/isNil";

const MessengerListView = (props: I_MessengerListViewProps) => {
  const {
    currentPage,
    triggerModalTopAlert,
    isDispatchControlMessengerLoading,
    dispatchControlMessengerData,
    getDispatchControlMessengers,
    gAuthData,
    getDashboardCount,
    dispatchControlCount,
    pageLoaded,
    setDispatchControlMessengerLoadedPage,
    currentTab
  } = props;

  const [
    messengerListPaginationCount,
    setMessengerListPaginationCount,
  ] = useState(0);
  const [messengerListPagination, setMessengerListPagination] = useState<any>(
    []
  );
  const [
    messengerListSearchPagination,
    setMessengerListSearchPagination,
  ] = useState<any>([]);
  const [
    messengerListSearchCurrentPage,
    setMessengerListSearchCurrentPage,
  ] = useState(0);
  const [messengerListCurrentPage, setMessengerListCurrentPage] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [selectedMessengerId, setSelectedMessengerId] = useState("");
  const [selectedMessengerName, setSelectedMessengerName] = useState("");
  const [isDeleteMessengerModalOpen, setIsDeleteMessengerModalOpen] = useState(false);

  useEffect(() => {
    if (!isNil(gAuthData) && gAuthData !== "" && !isNil(gAuthData.role)) {
      if (dispatchControlCount === 0) {
        getDashboardCount("dispatchControl");
      }
    }
  }, [gAuthData]);

  useEffect(() => {
    if(currentTab === "lists") {
      if(pageLoaded.length > 0) {
        const pageLoadedLoading = pageLoaded.includes(messengerListCurrentPage);
        if (
          currentPage === "Dispatch Control" &&
          dispatchControlMessengerData.length > 0 &&
          searchPhrase === "" &&
          !isDispatchControlMessengerLoading &&
          pageLoadedLoading &&
          !isDeleteMessengerModalOpen
        ) {
          const pagination = bigDataChunkArrayForPagination(
            dispatchControlMessengerData,
            messengerListPagination,
            pageLoaded.slice(-1).pop(),
            messengerListCurrentPage,
            pageLoaded.findIndex((res: number) => res === messengerListCurrentPage),
          );
          setMessengerListPagination(pagination);
        } else if (
          currentPage === "Dispatch Control" &&
          dispatchControlMessengerData.length > 0 &&
          searchPhrase !== "" &&
          !isDispatchControlMessengerLoading
        ) {
          const figure = chunkArrayForSearchPaginationDispatch(
            dispatchControlMessengerData,
            encodeListPaginationDataCount,
            searchPhrase.toLowerCase()
          );
          setMessengerListSearchPagination(
            figure
          );
        }
        if(isDeleteMessengerModalOpen) {
          const figure = chunkArray(
            dispatchControlMessengerData,
            encodeListPaginationDataCount,
            pageLoaded
          );
          setMessengerListPagination(
            figure
          );
        }
      }
    } else {
      if(messengerListCurrentPage !== 0) {
        setMessengerListCurrentPage(0)
      }
      if(pageLoaded.length > 1) {
        setDispatchControlMessengerLoadedPage([0])
      }
      const figure = chunkArray(
        dispatchControlMessengerData,
        encodeListPaginationDataCount,
        pageLoaded
      )
      setMessengerListPagination(
        figure
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchControlMessengerData, pageLoaded, messengerListCurrentPage, isDispatchControlMessengerLoading]);

  useEffect(() => {
    if(dispatchControlMessengerData.length > 0 && dispatchControlCount > 0 && messengerListPagination.length > 0 && isDeleteMessengerModalOpen) {
      const chunkCounts = messengerListPagination.map((res: any) => {
        return Array.isArray(res.data) ? res!.data.length : 0;
      })
      const currentPaginationItemCount = chunkCounts.reduce(function(a: number, b: number) { return a + b; }, 0);
      const isRecordRecordDeleted = currentPaginationItemCount > dispatchControlMessengerData.length
      if(isRecordRecordDeleted) {
        const isAllRecordLoaded = currentPaginationItemCount === dispatchControlCount
        if(!isAllRecordLoaded) {
          const toFetchCount = currentPaginationItemCount - dispatchControlMessengerData.length;
          const toSkip = currentPaginationItemCount-1;
          const urlVariables = `?limit=${toFetchCount}&skip=${toSkip}`;
          getDispatchControlMessengers(urlVariables);
        }
      }
    }
    if(pageLoaded.length > 0 && messengerListPagination.length > 0) {
      if(pageLoaded.length > messengerListPagination.length) {
        const messengerListPaginationArrLength = messengerListPagination.length-1;
        const pageLoadedNew = pageLoaded.map((res: number, index: number) => {
          return messengerListPaginationArrLength >= index ? res : undefined
        }).filter((res: any) => !isNil(res));
        if(pageLoaded.length - 1 === messengerListCurrentPage) {
          setMessengerListCurrentPage(messengerListPaginationArrLength)
        }
        setDispatchControlMessengerLoadedPage(pageLoadedNew);
        const newPaginationMaxCount = messengerListPaginationCount - (pageLoaded.length - messengerListPagination.length) 
        setMessengerListPaginationCount(
          newPaginationMaxCount
        );
      }
    }
  }, [dispatchControlMessengerData, messengerListPagination, dispatchControlCount])

  useEffect(() => {
    if(dispatchControlMessengerData.length > 0 && messengerListSearchPagination.length > 0 && isDeleteMessengerModalOpen) {
      const searchPaginationData = dispatchControlMessengerData.map((messengerData: I_DispatchControlMessenger) => {
        const name = messengerData.name.toLowerCase();
        const address = messengerData.address.toLowerCase();
        const preparedBy = messengerData.preparedBy.toLowerCase();
        const result = name.includes(searchPhrase) || address.includes(searchPhrase) || preparedBy.includes(searchPhrase);
        return result ? messengerData : null; 
      }).filter((res: any) => res);
      const searchPaginationNewCount = Math.ceil(searchPaginationData.length/encodeListPaginationDataCount)
      if(messengerListSearchPagination.length > searchPaginationNewCount) {
        const removedPages = messengerListSearchPagination.length - searchPaginationNewCount
        setMessengerListSearchCurrentPage(messengerListSearchCurrentPage - removedPages)
      }
    }
  }, [dispatchControlMessengerData, messengerListSearchPagination])

  const alterPagination = (
    isAddition: boolean,
    isLastPage: boolean,
    value: number
  ) => {
    if (!isLastPage) {
      const add = messengerListCurrentPage + value;
      const subtract = messengerListCurrentPage - value;
      const alterPageNumberBy = isAddition ? add : subtract;
      setMessengerListCurrentPage(alterPageNumberBy);

      const actualPageNumber = alterPageNumberBy;
      const isPageLoaded = pageLoaded.includes(actualPageNumber);
      if (!isPageLoaded) {
        const toSkip = dispatchControlCount - ((actualPageNumber+1) * encodeListPaginationDataCount);
        const urlVariables = `?limit=${encodeListPaginationDataCount}&skip=${toSkip < 0 ? 0 : toSkip}`;
        getDispatchControlMessengers(urlVariables, actualPageNumber);
      }
    } else {
      setMessengerListCurrentPage(value);
      const isPageLoaded = pageLoaded.includes(value);
      if (!isPageLoaded) {
        const remainder = dispatchControlCount % encodeListPaginationDataCount;
        const limit = remainder === 0 ? encodeListPaginationDataCount : remainder;
        const urlVariables = `?limit=${limit}&skip=0`;
        getDispatchControlMessengers(urlVariables, value);
      }
    }
  };

  useEffect(() => {
    setMessengerListCurrentPage(0);

    if (
      dispatchControlMessengerData.length > 0 &&
      searchPhrase !== "" &&
      searchPhrase.length > 2
    ) {
      const condition = `{"$or": [{"name": { "$regex": "${searchPhrase}", "$options": "i" }}, {"address": { "$regex": "${searchPhrase}", "$options": "i" }}, {"preparedBy": { "$regex": "${searchPhrase}", "$options": "i" }}]}`;
      const urlVariables = `?limit=0&condition=${encodeURIComponent(
        condition
      )}`;
      const newPageNumber = undefined;
      getDispatchControlMessengers(urlVariables, newPageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPhrase]);

  useEffect(() => {
    // This variable is the query variables that is being pass to the api for condition
    if (
      currentPage === "Dispatch Control" &&
      dispatchControlMessengerData.length === 0 &&
      dispatchControlCount > 0 &&
      currentTab === "lists"
    ) {
      const toSkip = dispatchControlCount-encodeListPaginationDataCount;
      const urlVariables = `?limit=${encodeListPaginationDataCount}&skip=${toSkip}`;
      const newPageNumber = 0;
      getDispatchControlMessengers(urlVariables, newPageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dispatchControlCount]);

  useEffect(() => {
    if (dispatchControlCount > 0) {
      setMessengerListPaginationCount(
        Math.ceil(dispatchControlCount / encodeListPaginationDataCount)
      );
    }
  }, [dispatchControlCount]);

  const renderDispatchControlMessenger = (
    id: string,
    messengerName: string,
    address: string,
    prepared: string,
    date: string,
    index: number
  ) => {
    const itemNumber =
      messengerListCurrentPage * encodeListPaginationDataCount + (index + 1);
    return (
      <tr key={index}>
        <td>{itemNumber}</td>
        <td>{messengerName}</td>
        <td>{address}</td>
        <td>{prepared}</td>
        <td>{moment(date).format("MMM D, YYYY")}</td>
        <td>
          <span className="BasicLink">View Record</span> |{" "}
          <span className="BasicLink">Print Receipt</span> |{" "}
          <span className="BasicLink">Print Proof</span> |{" "}
          <span className="BasicLink">Edit</span> |{" "}
          <span className="BasicLink" onClick={() => deleteMessenger(id, messengerName)}>Delete</span>
        </td>
      </tr>
    );
  };

  const renderDispatchControlMessengerTable = () => {
    const isPageExist =
      messengerListPagination.filter((pagination: any) => {
        return pagination.pageNumber === messengerListCurrentPage;
      }).length > 0;

    const isSearchPageExist =
      messengerListSearchPagination.filter((pagination: any) => {
        return pagination.pageNumber === messengerListSearchCurrentPage;
      }).length > 0;

    if (
      !isDispatchControlMessengerLoading &&
      dispatchControlMessengerData.length > 0 &&
      isPageExist &&
      searchPhrase === "" &&
      searchPhrase.length === 0
    ) {
      const pageIndex = messengerListPagination.findIndex(
        (pagination: any) => pagination.pageNumber === messengerListCurrentPage
      );
      return (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Messenger Name</th>
                <th>Address</th>
                <th>Prepared</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messengerListPagination[pageIndex].data.map(
                (messenger: I_DispatchControlMessenger, index: number) => {
                  return renderDispatchControlMessenger(
                    messenger._id,
                    messenger.name,
                    messenger.address,
                    messenger.preparedBy,
                    messenger.date,
                    index
                  );
                }
              )}
            </tbody>
          </Table>
          <Pagination>
            {messengerListCurrentPage > 0 ? (
              <>
                <Pagination.First
                  onClick={() => setMessengerListCurrentPage(0)}
                />
                <Pagination.Prev
                  onClick={() => alterPagination(false, false, 1)}
                />
              </>
            ) : null}
            <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
              {messengerListCurrentPage + 1} of {messengerListPaginationCount}
            </h3>
            {messengerListCurrentPage + 1 < messengerListPaginationCount ? (
              <>
                <Pagination.Next
                  onClick={() => alterPagination(true, false, 1)}
                />
                <Pagination.Last
                  onClick={() =>
                    alterPagination(
                      true,
                      true,
                      messengerListPaginationCount - 1
                    )
                  }
                />
              </>
            ) : null}
          </Pagination>
        </>
      );
    } else if (
      !isDispatchControlMessengerLoading &&
      messengerListSearchPagination.length > 0 &&
      isSearchPageExist &&
      searchPhrase !== "" &&
      searchPhrase.length > 2
    ) {
      return (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Messenger Name</th>
                <th>Address</th>
                <th>Prepared</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messengerListSearchPagination[messengerListSearchCurrentPage].data.map(
                (messenger: I_DispatchControlMessenger, index: number) => {
                  return renderDispatchControlMessenger(
                    messenger._id,
                    messenger.name,
                    messenger.address,
                    messenger.preparedBy,
                    messenger.date,
                    index
                  );
                }
              )}
            </tbody>
          </Table>
          <Pagination>
            {messengerListSearchCurrentPage > 0 ? (
              <>
                <Pagination.First
                  onClick={() => setMessengerListSearchCurrentPage(0)}
                />
                <Pagination.Prev
                  onClick={() => setMessengerListSearchCurrentPage(messengerListSearchCurrentPage - 1)}
                />
              </>
            ) : null}
            <h3 style={{ marginLeft: "10px", marginRight: "10px" }}>
              {messengerListSearchCurrentPage + 1} of {messengerListSearchPagination.length}
            </h3>
            {messengerListSearchCurrentPage + 1 < messengerListSearchPagination.length ? (
              <>
                <Pagination.Next
                  onClick={() => setMessengerListSearchCurrentPage(messengerListSearchCurrentPage + 1)}
                />
                <Pagination.Last
                    onClick={() => setMessengerListSearchCurrentPage(messengerListSearchPagination.length - 1)}
                />
              </>
            ) : null}
          </Pagination>
        </>
      );
    } else if (
      (isDispatchControlMessengerLoading &&
        (messengerListPaginationCount === 0 || messengerListPaginationCount > 0)) ||
      (searchPhrase.length > 0 && searchPhrase.length < 3)
    ) {
      return <Spinner animation="grow" />;
    } else if (
      !isDispatchControlMessengerLoading ||
      messengerListPagination.length > 0
    ) {
      return <h5 style={{ color: "gray" }}>No data found.</h5>;
    }
  };

  const deleteMessenger = (messengerId: string, messengerName: string) => {
    triggerModalTopAlert(false, "", "");
    setSelectedMessengerId(messengerId);
    setSelectedMessengerName(messengerName);
    setIsDeleteMessengerModalOpen(true);
  };

  return (
    <>
      <Form.Group controlId="searchEncodeList" style={{ marginTop: "25px" }}>
        <Form.Control
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
      </Form.Group>
      {renderDispatchControlMessengerTable()}
      <DeleteMessengerModal
        selectedMessengerName={selectedMessengerName}
        selectedMessengerId={selectedMessengerId}
        isDeleteMessengerModalOpen={isDeleteMessengerModalOpen}
        setIsDeleteMessengerModalOpen={(res: boolean) =>
          setIsDeleteMessengerModalOpen(res)
        }
      />
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  gAuthData: gState.auth.user,
  currentPage: gState.navBar.currentPage,
  isDispatchControlMessengerLoading: gState.dispatchControlMessenger.isLoading,
  dispatchControlMessengerData: gState.dispatchControlMessenger.data,
  dispatchControlCount: gState.dashboardCount.dispatchControl,
  pageLoaded: gState.dispatchControlMessenger.pageLoaded,
});

export default connect(mapStateToProps, {
  triggerModalTopAlert,
  getDispatchControlMessengers,
  getDashboardCount,
  setDispatchControlMessengerLoadedPage
})(MessengerListView);
