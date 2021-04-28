import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Spinner, FormControl } from "react-bootstrap";
import { I_LocationPriceProps, I_GlobalState } from "../../../interfaces";
import {
  getAreaPrices
} from "../../../actions/areaPriceActions";
import UpdateLocationPriceModal from "../modal/UpdateLocationPriceModal";
import _ from "lodash";

const LocationPrice = (props: I_LocationPriceProps) => {
  const {
    getAreaPrices,
    isAreaPriceLoading,
    areaPriceData
  } = props;

  useEffect(() => {
    if (areaPriceData.length === 0) {
      getAreaPrices();
    }
  }, []);

  const [selectedAreaPriceId, setSelectedAreaPriceId] = useState("");
  const [selectedAreaPriceName, setSelectedAreaPriceName] = useState("");
  const [selectedAreaPricePrice, setSelectedAreaPricePrice] = useState(0);
  const [isUpdateLocationPriceModalOpen, setIsUpdateLocationPriceModalOpen] = useState(false);

  const showUpdateLocationPriceModal = (
    name: string,
    price: number,
    id: string
  ) => {
    setSelectedAreaPriceName(name);
    setSelectedAreaPricePrice(price);
    setSelectedAreaPriceId(id);
    setIsUpdateLocationPriceModalOpen(true);
  };

  const renderAreaPrice = (
    name: string,
    price: number,
    id: string,
    index: number
  ) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {name}
        </td>
        <td>
          {price}
        </td>
        <td>
          <span style={{color: '#007bff', cursor: 'pointer'}} onClick={() => showUpdateLocationPriceModal(name, price, id)}>
            Edit
          </span>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Table striped bordered hover style={{ marginTop: "25px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isAreaPriceLoading ? (
            areaPriceData.map((areaPrice, index) =>
              renderAreaPrice(
                areaPrice.name,
                areaPrice.price,
                areaPrice._id,
                index
              )
            )
          ) : (
            <Spinner style={{ marginTop: "35px" }} animation="grow" />
          )}
        </tbody>
      </Table>
      <UpdateLocationPriceModal
        areaPriceId={selectedAreaPriceId}
        areaPriceName={selectedAreaPriceName}
        areaPricePrice={selectedAreaPricePrice}
        isUpdateLocationPriceModalOpen={isUpdateLocationPriceModalOpen}
        setIsUpdateLocationPriceModalOpen={(res: boolean) => setIsUpdateLocationPriceModalOpen(res)}
      />
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  isAreaPriceLoading: gState.areaPrice.isLoading,
  areaPriceData: gState.areaPrice.data
});

export default connect(mapStateToProps, {
  getAreaPrices
})(LocationPrice);
