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
import { getDispatchControlMessengers } from "../../../actions/dispatchControlMessengerActions";
import { encodeListPaginationDataCount } from "../../../constant";
import { getDashboardCount } from "../../../actions/dashboardCountActions";
import {
  bigDataChunkArrayForPagination,
  chunkArrayForSearchPaginationDispatch,
} from "../../../helper";
import _ from "lodash";

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

  useEffect(() => {
    if (!_.isNil(gAuthData) && gAuthData !== "" && !_.isNil(gAuthData.role)) {
      if (dispatchControlCount === 0) {
        getDashboardCount("dispatchControl");
      }
    }
  }, [gAuthData]);

  useEffect(() => {
    const pageLoadedLoading = pageLoaded.includes(messengerListCurrentPage);
    if (
      currentPage === "Dispatch Control" &&
      dispatchControlMessengerData.length > 0 &&
      searchPhrase === "" &&
      !isDispatchControlMessengerLoading &&
      pageLoadedLoading
    ) {
      const pagination = bigDataChunkArrayForPagination(
        dispatchControlMessengerData,
        messengerListPagination,
        pageLoaded.slice(-1).pop(),
        messengerListCurrentPage,
        pageLoaded.findIndex((res: number) => res === messengerListCurrentPage)
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
      console.log('ggg', figure)
      setMessengerListSearchPagination(
        figure
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatchControlMessengerData, pageLoaded, messengerListCurrentPage]);

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
      const toSkip = actualPageNumber * encodeListPaginationDataCount;
      if (!isPageLoaded) {
        const urlVariables = `?limit=${encodeListPaginationDataCount}&skip=${toSkip}`;
        getDispatchControlMessengers(urlVariables, actualPageNumber);
      }
    } else {
      setMessengerListCurrentPage(value);
      const isPageLoaded = pageLoaded.includes(value);
      if (!isPageLoaded) {
        const remainder = dispatchControlCount % encodeListPaginationDataCount;
        const toSkip = dispatchControlCount - remainder;
        const limit =
          remainder === 0 ? encodeListPaginationDataCount : remainder;
        const urlVariables = `?limit=${limit}&skip=${toSkip}`;
        console.log("puth 2", dispatchControlCount);
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
      const condition = `{"$or": [{"name": { "$regex": "${searchPhrase}" }}, {"address": { "$regex":"${searchPhrase}"}}, {"preparedBy": { "$regex":"${searchPhrase}"}}]}`;
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
      dispatchControlMessengerData.length === 0
    ) {
      const urlVariables = `?limit=${encodeListPaginationDataCount}`;
      const newPageNumber = 0;
      getDispatchControlMessengers(urlVariables, newPageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
          <span className="BasicLink">Delete</span>
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
      messengerListPagination.length > 0 ||
      !isDispatchControlMessengerLoading ||
      messengerListPagination.length > 0
    ) {
      return <h5 style={{ color: "gray" }}>No data found.</h5>;
    }
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
})(MessengerListView);
