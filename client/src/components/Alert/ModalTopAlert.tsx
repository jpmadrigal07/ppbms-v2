import React from "react";
import { connect } from "react-redux";
import { Alert, Container } from "react-bootstrap";
import { I_ModalTopAlertProps, I_GlobalState } from "../../interfaces";
import { triggerModalTopAlert } from "../../actions/modalTopAlertActions";

const ModalTopAlert = (props: I_ModalTopAlertProps) => {
  const { type, showAlert, message, triggerModalTopAlert } = props;
  return (
    <Alert
      style={{ marginBottom: "15px" }}
      variant={type}
      show={showAlert}
      onClose={() => triggerModalTopAlert(false, "", "")}
      dismissible
    >
      {message}
    </Alert>
  );
};

const mapStateToProps = (gState: I_GlobalState) => ({
  showAlert: gState.modalTopAlert.showAlert,
  message: gState.modalTopAlert.message,
  type: gState.modalTopAlert.type
});

export default connect(mapStateToProps, { triggerModalTopAlert })(ModalTopAlert);