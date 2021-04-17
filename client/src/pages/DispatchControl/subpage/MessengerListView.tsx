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
  } = props;

  const [
    messengerListPaginationCount,
    setMessengerListPaginationCount,
  ] = useState(0);
  const [messengerListPagination, setMessengerListPagination] = useState<any>(
    []
  );
  const [messengerListCurrentPage, setMessengerListCurrentPage] = useState(0);

  useEffect(() => {
    if (dispatchControlCount === 0) {
      getDashboardCount("dispatchControl");
    }
  }, [dispatchControlCount, getDashboardCount]);

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
    } else {
      setMessengerListCurrentPage(value);
    }
  };

  useEffect(() => {
    if (gAuthData && gAuthData !== "" && gAuthData.role) {
      getDispatchControlMessengers();
    }
  }, [gAuthData, getDispatchControlMessengers]);

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
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{messengerName}</td>
        <td>{address}</td>
        <td>{prepared}</td>
        <td>{moment(date).format("MMM D, YYYY")}</td>
        <td>
          <span className="BasicLink">View Record</span> |{" "}
          <span className="BasicLink">Print Receipt</span> |{" "}
          <span className="BasicLink">Delete</span>
        </td>
      </tr>
    );
  };

  const renderDispatchControlMessengerTable = () => {
    if (!isDispatchControlMessengerLoading) {
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
              {dispatchControlMessengerData.map(
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
    }
  };

  return (
    <>
      <Form.Group controlId="searchEncodeList" style={{ marginTop: "25px" }}>
        <Form.Control
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          disabled={isDispatchControlMessengerLoading}
          //   onChange={}
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
});

export default connect(mapStateToProps, {
  triggerModalTopAlert,
  getDispatchControlMessengers,
  getDashboardCount,
})(MessengerListView);
