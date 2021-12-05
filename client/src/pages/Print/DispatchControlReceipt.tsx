import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { I_GlobalState, I_DispatchControlData, I_DispatchControlReceiptProps } from "../../interfaces";
import { useHistory } from "react-router-dom";
import { gSetCurrentPage } from "../../actions/navBarActions";
import { getDispatchControlMessengers } from "../../actions/dispatchControlMessengerActions";
import { getDispatchControlData, getDispatchControlDataRecordCount } from "../../actions/dispatchControlDataActions";
import { defaultPageWhenLoggedIn } from "../../constant";
import moment from 'moment';
import _ from "lodash";
import "./DispatchControlProof.scss";
import signature from '../../images/arielsignature.png'; 

const DispatchControlReceipt = (props: I_DispatchControlReceiptProps) => {
    const { 
        dispatchControlMessengerData,
        dispatchControlDataData,
        getDispatchControlDataRecordCount,
        getDispatchControlMessengers,
        getDispatchControlData,
        gSetCurrentPage,
        proofRecordCounts,
        gAuthData
    } = props;

    const history = useHistory();
    const [messengerId, setMessengerId] = useState("");
    const [messengerName, setMessengerName] = useState("");
    const [preparedBy, setPreparedBy] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [grandTotal, setGrandTotal] = useState(0);

    const [remappedDispatchControlData, setRemappedDispatchControlData] = useState<I_DispatchControlData[] | undefined>(undefined);

    useEffect(() => {
        if(!_.isNil(gAuthData) && !_.isNil(gAuthData!.role)) {
          const href = window.location.href;
          const origin = window.location.origin;
          const getURLMessengerId = href.replace(
            `${origin}/dispatchcontrolreceipt?messengerid=`,
            ""
          );
          if (getURLMessengerId === href || getURLMessengerId === "") {
            gSetCurrentPage(defaultPageWhenLoggedIn);
            let link = defaultPageWhenLoggedIn;
            link = link.replace(/\s/g, "");
            link = link.toLowerCase();
            history.push("/" + link);
          } else {
            setMessengerId(getURLMessengerId);
            const condition = `{"_id": "${getURLMessengerId}"}`;
            const urlVariables = `?condition=${encodeURIComponent(condition)}`;
            getDispatchControlMessengers(urlVariables);
            const condition2 = `{"messengerId": "${getURLMessengerId}"}`;
            const urlVariables2 = `?condition=${encodeURIComponent(condition2)}&limit=24`;
            getDispatchControlData(urlVariables2)
          }
        }
    }, [gAuthData]);

    useEffect(() => {
        if(dispatchControlMessengerData.length > 0) {
            const [messenger] = dispatchControlMessengerData;
            const { name, address, preparedBy, date } = messenger;
            setMessengerName(name)
            setAddress(address)
            setPreparedBy(preparedBy)
            setDate(moment(date).format("MMM D, YYYY"))
        }
    }, [dispatchControlMessengerData])
    
    useEffect(() => {
        if(dispatchControlDataData.length > 0 && proofRecordCounts.length === 0 ) {
            const condition = dispatchControlDataData.map((res: I_DispatchControlData) => {
                return `{ "messengerId": "${messengerId}", "sender": "${res.sender}", "delType": "${res.delType}", "pud": "${moment(res.pickupDate).format("MM/DD/YYYY")}", "cycleCode": "${res.dataCycleCode}" }`
            });
            const urlVariables = `?condition=${encodeURIComponent(JSON.stringify(condition))}`;
            getDispatchControlDataRecordCount(urlVariables);
        }
    }, [dispatchControlDataData])

    useEffect(() => {
        if(dispatchControlDataData.length > 0 && proofRecordCounts.length > 0) {
            const remapped = dispatchControlDataData.map((res: I_DispatchControlData, index: number) => {
                setGrandTotal(grandTotal + proofRecordCounts[index]);
                return {
                    ...res,
                    recordQty: proofRecordCounts[index]
                }
            })
            setRemappedDispatchControlData(remapped);
        }
    }, [proofRecordCounts])

    const tableData = () => {
        return remappedDispatchControlData?.map((res: I_DispatchControlData) => {
            return (
                <tr>
                    <td style={{textAlign: 'center'}}>{res.dataCycleCode}</td>
                    <td style={{textAlign: 'center'}}>{res.pickupDate ? moment(res.pickupDate).format("MMM D, YYYY") : null}</td>
                    <td style={{textAlign: 'center'}}>{res.sender} {res.delType}</td>
                    <td style={{textAlign: 'center'}}>{res.dataCycleCode ? "Pieces" : null}</td>
                    <td style={{textAlign: 'center'}}>{res.recordQty}</td>
                </tr>
            );
        });
    }

    const tableLackRow = () => {
        const count = remappedDispatchControlData ? remappedDispatchControlData.length : 0;
        const lackRowCount = 24 - count;
        return lackRowCount < 24 ? [...Array(lackRowCount)].map(() => {
            return (
                <tr>
                    <td style={{textAlign: 'center'}}><span style={{visibility: 'hidden'}}>00000</span></td>
                    <td style={{textAlign: 'center'}}><span style={{visibility: 'hidden'}}>00000</span></td>
                    <td style={{textAlign: 'center'}}><span style={{visibility: 'hidden'}}>00000</span></td>
                    <td style={{textAlign: 'center'}}><span style={{visibility: 'hidden'}}>00000</span></td>
                    <td style={{textAlign: 'center'}}><span style={{visibility: 'hidden'}}>00000</span></td>
                </tr>
            );
        }) : null;
    }

    return (
        <div className="container dispatch-control-receipt">

        <div className="row">
           <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
               <h1 style={{marginBottom: '0px', marginTop: '50px'}}>P.P.B. Messengerial Services</h1>
           </div>
           <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
               <p style={{float: 'right', textAlign: 'right', paddingBottom: '0px'}}>Phase 7 Block 9 Lot 11 Gamet St.,<br/>Brgy. San Vicente, Pacita Complex 1,<br/>San Pedro, Laguna 4023<br/>Tel Nos. : 869-2622 / 478-2822</p>
           </div>
        </div>
        <div className="row">
           <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
               <hr style={{borderTop: '3px solid #000000', marginTop: '0px', marginBottom: '0px'}}/>
           </div>
        </div>
        <br/>
        <div className="row">
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Messenger Name: <b>{messengerName}</b>
           </div>
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Prepared by: <b>{preparedBy}</b>
           </div>
        </div>
        <div className="row">
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Address: <b>{address}</b>
           </div>
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                Date: <b>{date}</b>
           </div>
        </div>
        <div className="row">
           <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
               <h3 style={{textAlign: 'center', paddingTop: '10px', paddingBottom: '10px'}}><b>DISPATCH CONTROL</b></h3>
           </div>
        </div>
        <table className="table table-bordered">
           <thead className="table-header">
               <tr>
                   <th style={{textAlign: 'center'}}>CYCLE CODE</th>
                   <th style={{textAlign: 'center'}}>PICK-UP DATE</th>
                   <th style={{textAlign: 'center'}}>PRODUCT DESCRIPTION</th>
                   <th style={{textAlign: 'center'}}>UNIT</th>
                   <th style={{textAlign: 'center'}}>QUANTITY</th>
               </tr>
           </thead>
           <tbody>
                {tableData()}
                {tableLackRow()}
               <tr>
                   <td style={{visibility: 'hidden'}}>hello</td>
                   <td style={{visibility: 'hidden'}}>hello</td>
                   <td style={{visibility: 'hidden'}}>hello</td>
                   <td style={{textAlign: 'center'}}><b>Total</b></td>
                   <td style={{textAlign: 'center'}}>{grandTotal}</td>
               </tr>
           </tbody>
        </table>
        <div className="row">
           <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
               <div className="panel panel-default">
                 <div className="panel-heading" style={{textAlign: 'center', paddingTop: '10px', paddingBottom: '10px'}}><b style={{color: '#ffffff'}}>IMPORTANT REMINDER</b></div>
                 <div className="panel-body" style={{textAlign: 'center', padding: '15px'}}>POD's (Proof of Delivery) must return on/before the given timeline (NCR 8 days / PROVINCIAL 12 days after your pick-up). If not, the late POD's will not be compensated.</div>
               </div>
               <p style={{textAlign: 'center', marginTop: '10px', fontWeight: 'bold'}}>Please read the important reminder. Upon signing, it implies that you agreed the terms and condition</p>
           </div>
           <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
             <img src={signature} style={{position: 'absolute', width: '100px', marginLeft: '140px', marginTop: '105px'}} />
               <p>Received by:<br/><br/> _________________________________________________________<br/><p style={{fontSize: '15px', textAlign: 'center'}}>SIGNATURE OVER PRINTED NAME/DATE</p></p><br/>
               <p>Noted:<br/><p style={{fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '0px', marginTop: '10px'}}>ARIEL V. VICENTE</p><p style={{fontSize: '13px', padding: '0px', textAlign: 'center'}}>SUPERVISOR</p></p>
           </div>
        </div>
    </div>  
    )
}

const mapStateToProps = (gState: I_GlobalState) => ({
    recordData: gState.record.data,
    dispatchControlMessengerData: gState.dispatchControlMessenger.data,
    proofRecordCounts:  gState.dispatchControlData.proofRecordCounts,
    dispatchControlDataData: gState.dispatchControlData.data,
    gAuthData: gState.auth.user
});
  
export default connect(mapStateToProps, {
    getDispatchControlMessengers,
    getDispatchControlData,
    gSetCurrentPage,
    getDispatchControlDataRecordCount,
})(DispatchControlReceipt);

