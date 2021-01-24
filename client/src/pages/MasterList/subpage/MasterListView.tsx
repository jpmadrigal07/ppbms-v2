import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Spinner, Button, Pagination } from "react-bootstrap";
import { I_MasterListViewProps, I_GlobalState } from "../../../interfaces";
import { triggerTopAlert } from "../../../actions/topAlertActions";
import { triggerModalTopAlert } from "../../../actions/modalTopAlertActions";
import _ from "lodash";

const MasterListView = (props: I_MasterListViewProps) => {
  const { recordData, encodeListData, isEncodeListLoading } = props;

  useEffect(() => {
  }, []);

  const [selectedBarcodeMiddleTextId, setSelectedBarcodeMiddleTextId] = useState("");

  const renderEncodeLists = (
    id: string,
    fileName: string,
    dateImported: string,
    assignedCount: number,
    unassignedCount: number,
    totalCount: number,
    index: number
  ) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{fileName}</td>
        <td>{dateImported}</td>
        <td>{assignedCount}</td>
        <td>{unassignedCount}</td>
        <td>{totalCount}</td>
        <td>Edit</td>
      </tr>
    );
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
          {!isEncodeListLoading ? (
            encodeListData.slice(0).reverse().map((encodeList, index) => {
              const record = recordData.filter((rec) => rec.encodeListId === encodeList._id)
              const assigned = record.filter((rec) => !_.isNil(rec.messengerId) && rec.status === '1')
              const unAssigned = record.filter((rec) => rec.encodeListId === encodeList._id && rec.status === '1')
              return renderEncodeLists(
                encodeList._id,
                encodeList.fileName,
                encodeList.createdAt,
                assigned.length,
                unAssigned.length,
                record.length,
                index
              )
            })
          ) : (
            <Spinner style={{ marginTop: "35px" }} animation="grow" />
          )}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Item key={1} active={true}>
          1
        </Pagination.Item>
        <Pagination.Item>
          2
        </Pagination.Item>
        <Pagination.Item>
          3
        </Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  encodeListData: gState.encodeList.data,
  recordData: gState.record.data,
  isEncodeListLoading: gState.encodeList.isLoading,
});

export default connect(mapStateToProps, {})(MasterListView);
