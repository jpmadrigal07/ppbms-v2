import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { I_ReceiptProps, I_GlobalState, I_Record } from "../../interfaces";
import { gSetCurrentPage } from "../../actions/navBarActions";
import { getRecord } from "../../actions/recordActions";
import { defaultPageWhenLoggedIn } from "../../constant";
import { Spinner } from "react-bootstrap";
import "./Receipt.scss";
import _ from "lodash";
import JsBarcode from "jsbarcode";

const MasterListReceipt = (props: I_ReceiptProps) => {
  const { recordData, getRecord, gSetCurrentPage, gAuthData } = props;

  const history = useHistory();
  const [encodeListId, setEncodeListId] = useState("");
  const [selectedRecordData, setSelectedRecordData] = useState<I_Record[]>([]);

  useEffect(() => {
    if(!_.isNil(gAuthData) && !_.isNil(gAuthData!.role)) {
      const href = window.location.href;
      const origin = window.location.origin;
      const getURLEncodeListId = href.replace(
        `${origin}/receipt?encodelistid=`,
        ""
      );
      if (getURLEncodeListId === href || getURLEncodeListId === "") {
        gSetCurrentPage(defaultPageWhenLoggedIn);
        let link = defaultPageWhenLoggedIn;
        link = link.replace(/\s/g, "");
        link = link.toLowerCase();
        history.push("/" + link);
      } else {
        setEncodeListId(getURLEncodeListId);
        const condition = `{"encodeListId": "${getURLEncodeListId}"}`;
        const urlVariables = `?condition=${encodeURIComponent(condition)}`;
        getRecord(urlVariables);
      }
    }
  }, [gAuthData]);

  useEffect(() => {
    if (encodeListId !== "" && recordData.length > 0) {
      const records = recordData.filter((res) => {
        return res.encodeListId === encodeListId;
      });
      setSelectedRecordData(records);
    }
  }, [recordData]);

  useEffect(() => {
    if(!_.isNil(selectedRecordData) && selectedRecordData.length > 0) {
      JsBarcode(".barcode").init();
      window.print();
    }
  }, [selectedRecordData]);

  const renderReceipts = (recordData: I_Record[]) => {
    return recordData
      .reduce(function (accumulator: any, currentValue, currentIndex, array) {
        if (currentIndex % 4 === 0)
          accumulator.push(array.slice(currentIndex, currentIndex + 4));
        return accumulator;
      }, [])
      .map((p: any, pIndex: number) => {
        const rendering = p.map((res: I_Record, renderIndex: number) => {
          const counter = pIndex * 4 + (renderIndex + 1);
          return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 table-border">
              <div className="row">
                <table className="table-data">
                  <tbody>
                    <div className="top-margin"></div>
                    <tr className="highlight">
                      <td className="particular2" colSpan={2}>
                        {"PARTICULAR >"} <br />
                        <div className="cut-text">Sender: {res.sender}</div>
                        <div className="cut-text">DelType: {res.delType}</div>
                        <div className="cut-text">Area: {res.area}</div>
                      </td>
                      <td className="particular2 pudcc" colSpan={2}>
                        <div className="cut-text" style={{ fontSize: "11px" }}>
                          Cycle: {res.cycleCode}
                        </div>
                        <div className="cut-text">PUD: {res.pud}</div>
                        <div className="cut-text">
                          Job Order #: {res.jobNum}
                        </div>
                        <div className="cut-text">POD #: {counter}</div>
                      </td>
                    </tr>
                    <tr className="highlight">
                      <td colSpan={4}>
                        <div className="span-border">
                          {res.barCode}
                          <br />
                          <span id="subsname">{res.subsName}</span>
                          <br />
                          {res.address}
                        </div>
                      </td>
                    </tr>
                    <tr className="highlight">
                      <td colSpan={4}>
                        <span style={{ fontSize: "7px" }}>
                          <b>
                            I hereby acknowledge receipt of the particulars
                            details below
                          </b>
                        </span>
                      </td>
                    </tr>
                    <tr className="highlight">
                      <td colSpan={4}>
                        <div className="span-empty"></div>
                      </td>
                    </tr>
                    <tr className="highlight">
                      <td colSpan={2}>
                        __________________________________________
                        <br />
                        <span style={{ fontSize: "6px" }}>
                          <b>RECEIVED BY(NAME WITH SIGNATURE)</b>
                        </span>
                      </td>
                      <td colSpan={2}>
                        ______________________________________________
                        <br />
                        <span style={{ fontSize: "6px" }}>
                          <b>RELATION TO ADDRESSEE</b>
                        </span>
                      </td>
                    </tr>
                    <tr className="highlight">
                      <td colSpan={2} className="fillup-margin">
                        __________________________________________
                        <br />
                        <span style={{ fontSize: "6px" }}>
                          <b>DELIVERED BY</b>
                        </span>
                      </td>
                      <td colSpan={2} className="fillup-margin">
                        ______________________________________________
                        <br />
                        <span style={{ fontSize: "6px" }}>
                          <b>DATE RECEIVED</b>
                        </span>
                      </td>
                    </tr>
                    <tr className="highlight">
                      <td colSpan={2}>
                        <div className="rts-border">
                          <b>RTS REMARKS</b>
                          <br />
                          {"1 [ ] Moved Out (Person / Company)"}
                          <br />
                          {"2 [ ] Unknown (Person / Company)"}
                          <br />
                          {"3 [ ] Incomplete / Incorrect Address"}
                          <br />
                          {"4 [ ] Refused To Accept"}
                          <br />
                          {"5 [ ] House Closed / No One To Receive"}
                          <br />
                          {"6 [ ] Others __________________"}
                        </div>
                      </td>
                      <td className="particular" colSpan={2}>
                        {/* <img
                          alt="Barcode Generator TEC-IT"
                          src={`https://mobiledemand-barcode.azurewebsites.net/barcode/image?content=${res.barCode}&size=20&symbology=CODE_128&format=png&text=false`}
                          style={{ marginLeft: "-5px", width: "280px" }}
                        /> */}
                        {/* <img id={res.barCode}/> */}
                        <svg className="barcode"
                          jsbarcode-format="code128"
                          jsbarcode-value={res.barCode}
                          jsbarcode-margin="0"
                          jsbarcode-displayvalue="false"
                          jsbarcode-width="1"
                          jsbarcode-height="30">
                        </svg>
                        <br />
                        <b>PPB Messengerial Services, Inc.</b>
                        <br />
                        <span>Tel. No. 478-2822</span>
                      </td>
                    </tr>
                    <tr className="highlight">
                      <td colSpan={4}>
                        <div className="span-border-bottom">
                          <b style={{ fontSize: "9px" }}>
                            Paalala para sa tamang proseso ng pag deliver.
                          </b>
                          <br />
                          <i>
                            Ang pagpeke ng pirma at nagresib sa resibo ay may
                            kaukulang mabigat na parusa.
                          </i>
                          <br />
                          1.Magtanong muna kung tama ang address na iyong
                          dedeliveran at kung doon ba talaga nakatira ang
                          subscriber.
                          <br />
                          2.Iparesib at papirmahan ang resibo.
                          <br />
                          3.Hindi mensahero ang pipirma maliban kung ayaw talaga
                          pumirma ng magreresib ilagay ang pangalan ng nag resib
                          relation at palatandaan.
                          <br />
                          4.Maari lamang mag sulat ng mailbox sa resibo kung
                          talagang may mailbox talaga at tama ang dinedeliveran.
                          Kung may mailbox ilagay ang kulay ng mailbox.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        });

        return (
          <div className="row" id="page-break">
            {rendering}
          </div>
        );
      });
  };

  return (
    <>
      <div className="container-fluid">
        {!_.isNil(selectedRecordData) && selectedRecordData.length > 0 ? (
          renderReceipts(selectedRecordData)
        ) : (
          <Spinner style={{ marginTop: "35px" }} animation="grow" />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  recordData: gState.record.data,
  gAuthData: gState.auth.user
});

export default connect(mapStateToProps, {
  getRecord,
  gSetCurrentPage,
})(MasterListReceipt);
