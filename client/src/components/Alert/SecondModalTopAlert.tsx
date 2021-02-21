import React from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { I_SecondModalTopAlertProps, I_GlobalState } from "../../interfaces";
import { triggerSecondModalTopAlert } from "../../actions/secondModalTopAlertActions";

const SecondModalTopAlert = (props: I_SecondModalTopAlertProps) => {
  const { type, showAlert, message, triggerSecondModalTopAlert } = props;
  return (
    <Alert
      style={{ marginBottom: "15px" }}
      variant={type}
      show={showAlert}
      onClose={() => triggerSecondModalTopAlert(false, "", "")}
      dismissible
    >
      {message}
    </Alert>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  showAlert: gState.secondModalTopAlert.showAlert,
  message: gState.secondModalTopAlert.message,
  type: gState.secondModalTopAlert.type
});

export default connect(mapStateToProps, { triggerSecondModalTopAlert })(SecondModalTopAlert);