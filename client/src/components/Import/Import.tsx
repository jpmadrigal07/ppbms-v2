import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { I_ImportProps, I_GlobalState } from "../../interfaces";
import { uploadExcelFile } from "../../actions/recordActions";
import {
  getBarcodeMiddleText
} from "../../actions/barcodeMiddleTextActions";
import _ from "lodash";

const Import = (props: I_ImportProps) => {
  const { useBy, getBarcodeMiddleText, uploadExcelFile, isRecordAddLoading, barcodeMiddleTextData, recordData } = props;
  const [file, setFile] = useState("");
  const [sheetNumber, setSheetNumber] = useState("");
  const [barcodeMiddleText, setBarcodeMiddleText] = useState("");
  const [keyNumber, setKeyNumber] = useState(0);

  useEffect(() => {
    if (useBy === "masterlists") {
      getBarcodeMiddleText();
    }
  }, []);

  useEffect(() => {
    setKeyNumber(Math.random());
    setSheetNumber("");
  }, [recordData]);

  const handleChange = async (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    uploadExcelFile(file, sheetNumber);
  };

  const inputRender = () => {
    if (useBy === "masterlists") {
      return (
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Barcode Middle Text</Form.Label>
          <Form.Control as="select" onChange={(e) => setBarcodeMiddleText(e.target.value)}>
            <option></option>
            {barcodeMiddleTextData.map((res) => {
              return <option>{res.code}</option>
            })}
          </Form.Control>
        </Form.Group>
      );
    } else if (useBy === "encodemasterlists") {
      return (
        <Form.Group controlId="validationFormik103">
          <Form.Label>Sheet Number</Form.Label>
          <Form.Control
            type="number"
            name="sheetNumber"
            value={sheetNumber}
            disabled={isRecordAddLoading}
            onChange={(e) => setSheetNumber(e.target.value)}
          />
        </Form.Group>
      );
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
            <Form.Group>
              <Form.File
                className="position-relative"
                required
                name="file"
                label="File"
                onChange={handleChange}
                key={keyNumber}
                disabled={isRecordAddLoading}
              />
            </Form.Group>
            {inputRender()}
            <Button variant="primary" type="submit">
              {isRecordAddLoading ? (
                <Spinner animation="grow" variant="light" size="sm" />
              ) : (
                "Upload"
              )}
            </Button>
          </Form>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  isRecordAddLoading: gState.record.isAddLoading,
  recordData: gState.record.data,
  barcodeMiddleTextData: gState.barcodeMiddleText.data
});

export default connect(mapStateToProps, {
  getBarcodeMiddleText,
  uploadExcelFile,
})(Import);
